import React from 'react';
import { useApp } from '../../context/AppContext';
import { MotivationalBanner } from './MotivationalBanner';
import { DailyProgressCircle } from './DailyProgressCircle';
import { WeeklyOverviewChart } from './WeeklyOverviewChart';
import { TodaySchedule } from './TodaySchedule';
import { QuickAddTask } from './QuickAddTask';
import { formatDate, isPastDue } from '../../utils/dateUtils';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Layers,
  ArrowRight,
  Flame,
  Sprout,
  Target,
  Sparkles,
} from 'lucide-react';

export const DashboardView = () => {
  const {
    tasks,
    habits,
    toggleHabitDate,
    setActiveTab,
    setIsTaskModalOpen,
    setEditingTask,
    setIsPlanDayModalOpen,
    user,
  } = useApp();

  const todayStr = formatDate();

  // Metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = tasks.filter((t) => t.status !== 'Completed').length;
  const overdueTasks = tasks.filter((t) => isPastDue(t.dueDate, t.status)).length;

  // Today specific metrics for circle
  const todayTasks = tasks.filter((t) => t.dueDate === todayStr);
  const todayCompleted = todayTasks.filter((t) => t.status === 'Completed').length;

  // Today priority tasks
  const todayPriorityTasks = todayTasks
    .filter((t) => t.priority === 'High' && t.status !== 'Completed')
    .slice(0, 3);

  const activeHabitsToday = habits.filter((h) => !h.archived);

  return (
    <div className="space-y-6 sm:space-y-8 animate-bloom">
      {/* Daily Motivational Banner */}
      <MotivationalBanner />

      {/* Quick Add Bar */}
      <div>
        <QuickAddTask defaultCategory="Study" />
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Tasks */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100/70 dark:border-purple-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Garden
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            {totalTasks}
          </p>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-1">
            Across all categories
          </p>
        </div>

        {/* Completed Tasks */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#181524] border border-emerald-100/70 dark:border-emerald-950/30 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Bloomed
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {completedTasks}
          </p>
          <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400 mt-1">
            Tasks completed
          </p>
        </div>

        {/* Pending Tasks */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#181524] border border-amber-100/70 dark:border-amber-950/30 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              In Progress
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-300 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {pendingTasks}
          </p>
          <p className="text-[11px] text-amber-600/80 dark:text-amber-400 mt-1">
            Tasks active
          </p>
        </div>

        {/* Overdue Tasks */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#181524] border border-rose-100/70 dark:border-rose-950/30 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Needs Attention
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400">
            {overdueTasks}
          </p>
          <p className="text-[11px] text-rose-600/80 dark:text-rose-400 mt-1">
            Overdue tasks
          </p>
        </div>
      </div>

      {/* Main Grid: Progress Circle + Today's Priority & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Circular Daily Progress + Habits Checkoff */}
        <div className="space-y-6">
          {/* Circular Progress Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100/70 dark:border-purple-900/30 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span>Today's Bloom</span>
                <span className="text-base">🌷</span>
              </h3>
              <button
                onClick={() => setIsPlanDayModalOpen(true)}
                className="text-xs font-semibold text-purple-600 dark:text-purple-300 hover:underline"
              >
                Plan Day
              </button>
            </div>
            <DailyProgressCircle
              completed={todayCompleted}
              total={todayTasks.length}
              size={150}
            />
          </div>

          {/* Quick Habit Check-ins */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100/70 dark:border-purple-900/30 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-500" />
                <span>Habit Seeds</span>
              </h3>
              <button
                onClick={() => setActiveTab('habits')}
                className="text-xs font-semibold text-purple-600 dark:text-purple-300 hover:underline flex items-center gap-1"
              >
                All <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {activeHabitsToday.slice(0, 4).map((h) => {
                const doneToday = !!h.completedDates?.[todayStr];
                return (
                  <div
                    key={h.id}
                    onClick={() => toggleHabitDate(h.id, todayStr)}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-purple-50/40 dark:bg-slate-800/40 border border-purple-50 dark:border-purple-900/20 cursor-pointer hover:bg-purple-100/50 transition-all text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-xl flex items-center justify-center transition-all ${
                          doneToday
                            ? 'bg-gradient-to-tr from-emerald-400 to-teal-500 text-white shadow-soft-sm'
                            : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
                        }`}
                      >
                        {doneToday ? '✓' : ''}
                      </div>
                      <span
                        className={
                          doneToday
                            ? 'line-through text-slate-400 font-medium'
                            : 'text-slate-700 dark:text-slate-200 font-medium'
                        }
                      >
                        {h.name}
                      </span>
                    </div>

                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-0.5">
                      <Flame className="w-3 h-3 text-amber-500" /> {h.streak}d
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center/Right Column (2 spans): Today's Schedule & High Priority Focus */}
        <div className="lg:col-span-2 space-y-6">
          {/* Priority Focus */}
          {todayPriorityTasks.length > 0 && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-50/80 via-pink-50/80 to-purple-50/80 dark:from-[#231828] dark:via-[#21182A] dark:to-[#1C172B] border border-rose-100 dark:border-rose-900/30 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-rose-500" /> Today's Core Focus
                </span>
                <span className="text-xs text-rose-600/80 dark:text-rose-400">
                  {todayPriorityTasks.length} High Priority
                </span>
              </div>
              <div className="space-y-2">
                {todayPriorityTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/90 dark:bg-slate-900/70 border border-rose-100 dark:border-rose-900/20 shadow-soft-sm"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                        {task.title}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {task.category} • {task.startTime || 'Flexible slot'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingTask(task);
                        setIsTaskModalOpen(true);
                      }}
                      className="px-2.5 py-1 text-xs rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-semibold hover:bg-purple-200"
                    >
                      Focus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Today's Schedule Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100/70 dark:border-purple-900/30 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span>Today's Flow</span>
                  <span className="text-xs font-normal text-purple-600 dark:text-purple-400">
                    ({todayTasks.length} scheduled)
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Time-slotted tasks and sessions
                </p>
              </div>
              <button
                onClick={() => setActiveTab('planner')}
                className="text-xs font-semibold text-purple-600 dark:text-purple-300 hover:underline flex items-center gap-1"
              >
                Open Timeline <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <TodaySchedule onOpenAddTask={() => setIsTaskModalOpen(true)} />
          </div>

          {/* Weekly Productivity Overview Chart */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100/70 dark:border-purple-900/30 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
                  Weekly Productivity Rhythm
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Completed vs Pending tasks over the last 7 days
                </p>
              </div>
              <button
                onClick={() => setActiveTab('analytics')}
                className="text-xs font-semibold text-purple-600 dark:text-purple-300 hover:underline flex items-center gap-1"
              >
                Detailed Analytics <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <WeeklyOverviewChart />
          </div>
        </div>
      </div>
    </div>
  );
};
