import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getPastNDays, formatMinutesToHours } from '../../utils/dateUtils';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  PieChart as PieIcon,
  Flame,
} from 'lucide-react';

const COLORS = ['#A855F7', '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#14B8A6'];

export const AnalyticsView = () => {
  const { tasks, studySessions, habits, user } = useApp();

  // 1. Overall Task stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const overallCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // 2. Total Study Hours
  const totalStudyMinutes = studySessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  // 3. Category distribution for PieChart
  const categoryData = useMemo(() => {
    const counts = {};
    tasks.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return Object.keys(counts).map((cat) => ({
      name: cat,
      value: counts[cat],
    }));
  }, [tasks]);

  // 4. Past 7 days productivity trend
  const past7Days = getPastNDays(7);
  const trendData = useMemo(() => {
    return past7Days.map((dStr) => {
      const dObj = new Date(dStr + 'T00:00:00');
      const dayName = dObj.toLocaleDateString('en-US', { weekday: 'short' });

      const dayTasks = tasks.filter((t) => t.dueDate === dStr);
      const completed = dayTasks.filter((t) => t.status === 'Completed').length;
      const daySessions = studySessions.filter((s) => s.date === dStr);
      const studyHrs = Number(
        (daySessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0) / 60).toFixed(1)
      );

      return {
        date: dStr,
        day: dayName,
        Completed: completed,
        Total: dayTasks.length,
        StudyHours: studyHrs,
      };
    });
  }, [tasks, studySessions, past7Days]);

  // 5. Most productive day of the week calculation
  const mostProductiveDay = useMemo(() => {
    const dayScores = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    tasks.forEach((t) => {
      if (t.status === 'Completed' && t.completedAt) {
        const d = new Date(t.completedAt);
        const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' });
        if (dayScores[dayStr] !== undefined) dayScores[dayStr] += 1;
      }
    });
    let bestDay = 'Wednesday';
    let maxScore = -1;
    Object.keys(dayScores).forEach((d) => {
      if (dayScores[d] > maxScore) {
        maxScore = dayScores[d];
        bestDay = d;
      }
    });
    return bestDay;
  }, [tasks]);

  // 6. Habit consistency overall
  const habitConsistency = useMemo(() => {
    if (habits.length === 0) return 0;
    const totalEntries = habits.reduce(
      (acc, h) => acc + Object.keys(h.completedDates || {}).length,
      0
    );
    const avgPerHabit = totalEntries / habits.length;
    return Math.min(100, Math.round(avgPerHabit * 10));
  }, [habits]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-bloom">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span>Productivity & Growth Analytics</span>
          <span className="text-xl">📊</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Real-time metrics computed directly from your saved tasks, study sessions, and habits.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Completion Rate</span>
            <CheckCircle2 className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">
            {overallCompletionRate}%
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {completedTasks} of {totalTasks} tasks done
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-pink-100 dark:border-pink-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Total Study Time</span>
            <Clock className="w-4 h-4 text-pink-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-pink-600 dark:text-pink-400">
            {totalStudyHours}h
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {studySessions.length} sessions logged
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-amber-100 dark:border-amber-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Peak Bloom Day</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {mostProductiveDay}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Highest task velocity</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-emerald-100 dark:border-emerald-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Habit Index</span>
            <Flame className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {habitConsistency}%
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Routine regularity score</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Trends (Bar & Line Chart) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span>7-Day Completion Flow</span>
              </h3>
              <p className="text-xs text-slate-400">Completed tasks by day</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    fontSize: '11px',
                    border: '1px solid #E9D5FF',
                  }}
                />
                <Bar dataKey="Completed" fill="#A855F7" radius={[6, 6, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown (Pie Chart) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-pink-500" />
                <span>Category Distribution</span>
              </h3>
              <p className="text-xs text-slate-400">Balance across life aspects</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${val} tasks`, name]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    fontSize: '11px',
                    border: '1px solid #E9D5FF',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
