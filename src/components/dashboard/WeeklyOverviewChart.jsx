import React from 'react';
import { useApp } from '../../context/AppContext';
import { getPastNDays, formatDisplayDate } from '../../utils/dateUtils';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export const WeeklyOverviewChart = () => {
  const { tasks, studySessions } = useApp();

  const past7Days = getPastNDays(7);

  const chartData = past7Days.map((dateStr) => {
    const dayTasks = tasks.filter((t) => t.dueDate === dateStr);
    const completedTasks = dayTasks.filter((t) => t.status === 'Completed').length;
    const totalTasks = dayTasks.length;

    // Study hours for this day
    const daySessions = studySessions.filter((s) => s.date === dateStr);
    const totalMinutes = daySessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);
    const studyHours = Number((totalMinutes / 60).toFixed(1));

    const dateObj = new Date(dateStr + 'T00:00:00');
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

    return {
      date: dateStr,
      day: dayName,
      Completed: completedTasks,
      Pending: Math.max(0, totalTasks - completedTasks),
      StudyHours: studyHours,
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white dark:bg-[#1C182A] rounded-2xl shadow-soft-xl border border-purple-100 dark:border-purple-900/40 text-xs">
          <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="font-medium">
              {entry.name}: {entry.value} {entry.name === 'StudyHours' ? 'hrs' : 'tasks'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94A3B8', fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
          />
          <Bar
            dataKey="Completed"
            name="Completed Tasks"
            fill="#A855F7"
            radius={[6, 6, 0, 0]}
            maxBarSize={28}
          />
          <Bar
            dataKey="Pending"
            name="Pending Tasks"
            fill="#FBCFE8"
            radius={[6, 6, 0, 0]}
            maxBarSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
