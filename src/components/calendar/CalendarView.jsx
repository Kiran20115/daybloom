import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate, getDaysInMonth, getDayOfWeekIndex, formatDisplayDate } from '../../utils/dateUtils';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
} from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const CalendarView = () => {
  const { tasks, setIsTaskModalOpen, setEditingTask } = useApp();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayTasksModalDate, setSelectedDayTasksModalDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInCurrentMonth = getDaysInMonth(year, month);
  const startDayOffset = getDayOfWeekIndex(year, month, 1, false);

  const prevMonthDays = getDaysInMonth(year, month - 1);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleJumpToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (dateStr) => {
    setSelectedDayTasksModalDate(dateStr);
  };

  const handleQuickAddForDate = (dateStr) => {
    setEditingTask({
      dueDate: dateStr,
      category: 'Study',
      priority: 'Medium',
    });
    setIsTaskModalOpen(true);
  };

  // Build grid calendar cells
  const calendarCells = [];

  // Previous month trailing days
  for (let i = startDayOffset - 1; i >= 0; i--) {
    const dayNum = prevMonthDays - i;
    calendarCells.push({
      day: dayNum,
      isCurrentMonth: false,
      dateStr: null,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    calendarCells.push({
      day,
      isCurrentMonth: true,
      dateStr,
      isToday: dateStr === formatDate(),
    });
  }

  // Next month leading days to complete grid
  const totalCells = Math.ceil(calendarCells.length / 7) * 7;
  const remainingCells = totalCells - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push({
      day: i,
      isCurrentMonth: false,
      dateStr: null,
    });
  }

  const categoryColors = {
    Study: 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300',
    Project: 'bg-pink-100 text-pink-700 dark:bg-pink-900/60 dark:text-pink-300',
    Health: 'bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300',
    Personal: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300',
    Reading: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300',
  };

  return (
    <div className="space-y-6 animate-bloom">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>Productivity Calendar</span>
            <span className="text-xl">📅</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Visualize project deadlines, exam prep, and daily commitments.
          </p>
        </div>

        <button
          onClick={() => handleQuickAddForDate(formatDate())}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 hover:from-purple-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-soft hover:shadow-glow-lavender transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task to Calendar</span>
        </button>
      </div>

      {/* Month Navigation Card */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
            {MONTH_NAMES[month]} {year}
          </h3>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={handleJumpToday}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100 transition-colors"
        >
          Today
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft overflow-x-auto">
        <div className="min-w-[650px]">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 mb-2 text-center">
            {WEEK_DAYS.map((wd) => (
              <div key={wd} className="text-xs font-bold uppercase text-slate-400 py-1">
                {wd}
              </div>
            ))}
          </div>

          {/* Month grid cells */}
          <div className="grid grid-cols-7 gap-2">
            {calendarCells.map((cell, idx) => {
              if (!cell.isCurrentMonth) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="h-28 rounded-2xl bg-purple-50/20 dark:bg-slate-900/20 border border-purple-50/40 dark:border-purple-950/20 p-2 opacity-40 text-xs text-slate-400"
                  >
                    <span>{cell.day}</span>
                  </div>
                );
              }

              // Tasks on this cell's date
              const dayTasks = tasks.filter((t) => t.dueDate === cell.dateStr);

              return (
                <div
                  key={cell.dateStr}
                  onClick={() => handleDayClick(cell.dateStr)}
                  className={`h-28 rounded-2xl p-2 border transition-all flex flex-col justify-between group cursor-pointer ${
                    cell.isToday
                      ? 'bg-purple-50/90 dark:bg-purple-950/40 border-purple-400 dark:border-purple-600 shadow-soft-sm'
                      : 'bg-white dark:bg-[#1C182A] border-purple-100/70 dark:border-purple-900/30 hover:border-purple-300 hover:shadow-soft-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                        cell.isToday
                          ? 'bg-purple-600 text-white'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {cell.day}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAddForDate(cell.dateStr);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-purple-600 hover:scale-110 p-0.5 transition-all"
                      title="Add task on this date"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Tasks List snippet */}
                  <div className="space-y-1 overflow-y-auto max-h-16 pr-0.5 my-1">
                    {dayTasks.slice(0, 3).map((t) => (
                      <div
                        key={t.id}
                        className={`text-[10px] px-1.5 py-0.5 rounded-lg truncate font-medium ${
                          categoryColors[t.category] || categoryColors.Study
                        } ${t.status === 'Completed' ? 'line-through opacity-60' : ''}`}
                      >
                        {t.title}
                      </div>
                    ))}
                    {dayTasks.length > 3 && (
                      <span className="text-[9px] text-purple-600 dark:text-purple-400 font-semibold block text-center">
                        +{dayTasks.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
