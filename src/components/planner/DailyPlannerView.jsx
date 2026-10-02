import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate, formatDisplayDate } from '../../utils/dateUtils';
import { PlanMyDayModal } from './PlanMyDayModal';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
  CalendarDays,
} from 'lucide-react';

const HOURS = Array.from({ length: 18 }, (_, i) => i + 6); // 06:00 to 23:00

export const DailyPlannerView = () => {
  const {
    tasks,
    toggleTaskStatus,
    setIsTaskModalOpen,
    setEditingTask,
    isPlanDayModalOpen,
    setIsPlanDayModalOpen,
  } = useApp();

  const [selectedDate, setSelectedDate] = useState(formatDate());
  const [plannerMode, setPlannerMode] = useState('day'); // 'day' | 'week'
  const [currentMinutes, setCurrentMinutes] = useState(0);

  // Update live current time indicator
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentMinutes(now.getHours() * 60 + now.getMinutes());
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const changeDateBy = (days) => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + days);
    setSelectedDate(formatDate(d));
  };

  const dayTasks = tasks.filter((t) => t.dueDate === selectedDate);
  const scheduledTasks = dayTasks.filter((t) => t.startTime);
  const unscheduledTasks = dayTasks.filter((t) => !t.startTime);

  const handleAddAtHour = (hourNum) => {
    const formattedHour = String(hourNum).padStart(2, '0') + ':00';
    const nextHour = String(hourNum + 1).padStart(2, '0') + ':00';
    setEditingTask({
      dueDate: selectedDate,
      startTime: formattedHour,
      endTime: nextHour,
      category: 'Study',
      priority: 'Medium',
    });
    setIsTaskModalOpen(true);
  };

  // Week days for week mode
  const getWeekDates = () => {
    const current = new Date(selectedDate + 'T00:00:00');
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1); // Monday
    const monday = new Date(current.setDate(diff));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return formatDate(d);
    });
  };

  const weekDates = getWeekDates();

  return (
    <div className="space-y-6 animate-bloom">
      {/* Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>Daily Planner & Timeline</span>
            <span className="text-xl">⏳</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Structure your hours with intention and protect your deep focus windows.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Day / Week Switcher */}
          <div className="flex items-center p-1 bg-purple-50 dark:bg-slate-800 rounded-2xl border border-purple-100 dark:border-purple-900/30">
            <button
              onClick={() => setPlannerMode('day')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                plannerMode === 'day'
                  ? 'bg-white dark:bg-purple-900 text-purple-700 dark:text-purple-200 shadow-soft-sm'
                  : 'text-slate-500'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setPlannerMode('week')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                plannerMode === 'week'
                  ? 'bg-white dark:bg-purple-900 text-purple-700 dark:text-purple-200 shadow-soft-sm'
                  : 'text-slate-500'
              }`}
            >
              Week
            </button>
          </div>

          {/* Plan My Day Button */}
          <button
            onClick={() => setIsPlanDayModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-200 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plan My Day</span>
          </button>
        </div>
      </div>

      {/* Date Navigation Bar */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft">
        <div className="flex items-center gap-2">
          <button
            onClick={() => changeDateBy(-1)}
            className="p-2 rounded-xl text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
              {formatDisplayDate(selectedDate)}
            </span>
            {selectedDate === formatDate() && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                Today
              </span>
            )}
          </div>
          <button
            onClick={() => changeDateBy(1)}
            className="p-2 rounded-xl text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => setSelectedDate(formatDate())}
          className="text-xs font-semibold text-purple-600 dark:text-purple-300 hover:underline"
        >
          Jump to Today
        </button>
      </div>

      {/* Daily View Timeline Layout */}
      {plannerMode === 'day' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main 24h/Hour-by-hour Timeline (3 columns) */}
          <div className="lg:col-span-3 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft relative">
            {/* Current time line if selectedDate is today */}
            {selectedDate === formatDate() && currentMinutes >= 360 && currentMinutes <= 1380 && (
              <div
                className="absolute left-16 right-4 border-t-2 border-rose-400 z-10 pointer-events-none flex items-center"
                style={{
                  top: `${((currentMinutes - 360) / 1080) * 100}%`,
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 -ml-1 animate-ping" />
                <span className="text-[10px] font-bold text-rose-500 ml-2 bg-white dark:bg-slate-900 px-1 rounded shadow-sm">
                  Now
                </span>
              </div>
            )}

            <div className="space-y-4">
              {HOURS.map((hour) => {
                const hourFormatted = String(hour).padStart(2, '0') + ':00';
                const displayHour =
                  hour === 12
                    ? '12 PM'
                    : hour > 12
                    ? `${hour - 12} PM`
                    : `${hour} AM`;

                // Find tasks that start in this hour
                const matchingTasks = scheduledTasks.filter((t) => {
                  const [tHour] = t.startTime.split(':');
                  return Number(tHour) === hour;
                });

                return (
                  <div
                    key={hour}
                    className="flex items-start gap-4 min-h-[60px] group border-b border-purple-50 dark:border-purple-900/20 pb-3"
                  >
                    <div className="w-16 shrink-0 text-right">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                        {displayHour}
                      </span>
                    </div>

                    <div className="flex-1 space-y-2">
                      {matchingTasks.length > 0 ? (
                        matchingTasks.map((t) => {
                          const isDone = t.status === 'Completed';
                          return (
                            <div
                              key={t.id}
                              className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                                isDone
                                  ? 'bg-purple-50/40 dark:bg-slate-800/30 border-purple-100/40 opacity-70'
                                  : 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-200/60 dark:border-purple-800/40 shadow-soft-sm hover:shadow-soft'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <button
                                  onClick={() => toggleTaskStatus(t.id)}
                                  className="text-purple-600 dark:text-purple-400 hover:scale-110 transition-transform"
                                >
                                  {isDone ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                  ) : (
                                    <Clock className="w-4 h-4 text-purple-400" />
                                  )}
                                </button>
                                <div className="min-w-0">
                                  <p
                                    className={`text-xs sm:text-sm font-semibold truncate ${
                                      isDone
                                        ? 'line-through text-slate-400'
                                        : 'text-slate-800 dark:text-slate-200'
                                    }`}
                                  >
                                    {t.title}
                                  </p>
                                  <p className="text-[10px] text-purple-700 dark:text-purple-300">
                                    {t.startTime} - {t.endTime || 'Flexible'} • {t.category}
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  setEditingTask(t);
                                  setIsTaskModalOpen(true);
                                }}
                                className="text-[11px] text-purple-600 dark:text-purple-300 hover:underline shrink-0"
                              >
                                Edit
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <button
                          onClick={() => handleAddAtHour(hour)}
                          className="w-full py-2.5 rounded-2xl border border-dashed border-transparent hover:border-purple-200 dark:hover:border-purple-900/40 hover:bg-purple-50/30 dark:hover:bg-purple-950/20 flex items-center justify-center text-slate-300 hover:text-purple-600 transition-all text-xs gap-1 opacity-0 group-hover:opacity-100"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Schedule activity at {displayHour}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar: Unscheduled for Selected Day */}
          <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-purple-500" />
                  <span>Unassigned Slots ({unscheduledTasks.length})</span>
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                Tasks due on this day without an hourly start time:
              </p>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {unscheduledTasks.length === 0 ? (
                  <p className="text-xs text-center text-slate-400 py-6">
                    All tasks for this day have designated times.
                  </p>
                ) : (
                  unscheduledTasks.map((t) => (
                    <div
                      key={t.id}
                      className="p-3 rounded-2xl bg-purple-50/40 dark:bg-slate-800/30 border border-purple-100/50 dark:border-purple-900/20 text-xs"
                    >
                      <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {t.title}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">
                          {t.category}
                        </span>
                        <button
                          onClick={() => {
                            setEditingTask(t);
                            setIsTaskModalOpen(true);
                          }}
                          className="text-[10px] px-2 py-0.5 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-200 font-semibold hover:bg-purple-200"
                        >
                          Set Time
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Weekly View */
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {weekDates.map((wDate) => {
            const dateObj = new Date(wDate + 'T00:00:00');
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = dateObj.getDate();
            const isTodayDate = wDate === formatDate();
            const tasksOnThisDay = tasks.filter((t) => t.dueDate === wDate);

            return (
              <div
                key={wDate}
                className={`p-4 rounded-3xl border transition-all ${
                  isTodayDate
                    ? 'bg-gradient-to-b from-purple-50 to-pink-50 dark:from-[#211A30] dark:to-[#1C172B] border-purple-300 dark:border-purple-700 shadow-soft'
                    : 'bg-white dark:bg-[#181524] border-purple-100/70 dark:border-purple-900/30'
                }`}
              >
                <div className="text-center pb-3 border-b border-purple-100/50 dark:border-purple-900/20 mb-3">
                  <span className="text-xs uppercase font-bold text-slate-400">{dayName}</span>
                  <p
                    className={`text-xl font-extrabold ${
                      isTodayDate ? 'text-purple-600 dark:text-purple-300' : 'text-slate-800 dark:text-slate-100'
                    }`}
                  >
                    {dayNum}
                  </p>
                </div>

                <div className="space-y-2 min-h-[160px]">
                  {tasksOnThisDay.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        setEditingTask(t);
                        setIsTaskModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-100/60 dark:border-purple-900/20 text-[11px] font-medium text-slate-700 dark:text-slate-200 cursor-pointer hover:bg-purple-100 transition-all truncate"
                    >
                      {t.title}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setEditingTask({ dueDate: wDate, category: 'Study', priority: 'Medium' });
                      setIsTaskModalOpen(true);
                    }}
                    className="w-full py-1.5 text-[11px] rounded-xl border border-dashed border-purple-200 dark:border-purple-900/40 text-purple-500 hover:bg-purple-50 dark:hover:bg-slate-800 transition-all text-center"
                  >
                    + Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Plan My Day Modal */}
      <PlanMyDayModal
        isOpen={isPlanDayModalOpen}
        onClose={() => setIsPlanDayModalOpen(false)}
      />
    </div>
  );
};
