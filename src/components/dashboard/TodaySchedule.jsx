import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/dateUtils';
import { Clock, CheckCircle2, Circle } from 'lucide-react';

export const TodaySchedule = ({ onOpenAddTask }) => {
  const { tasks, toggleTaskStatus } = useApp();
  const todayStr = formatDate();

  // Tasks scheduled for today, sorted by start time
  const todayTasks = tasks
    .filter((t) => t.dueDate === todayStr)
    .sort((a, b) => {
      if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime);
      if (a.startTime) return -1;
      if (b.startTime) return 1;
      return a.order - b.order;
    });

  return (
    <div className="space-y-3">
      {todayTasks.length === 0 ? (
        <div className="py-8 text-center bg-purple-50/30 dark:bg-purple-950/20 rounded-2xl border border-dashed border-purple-200/60 dark:border-purple-900/40">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No events scheduled for today yet.
          </p>
          <button
            onClick={onOpenAddTask}
            className="mt-2 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
          >
            + Add a task for today
          </button>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {todayTasks.map((t) => {
            const isCompleted = t.status === 'Completed';
            return (
              <div
                key={t.id}
                className={`flex items-center justify-between p-3 rounded-2xl transition-all border ${
                  isCompleted
                    ? 'bg-purple-50/30 dark:bg-slate-900/30 border-purple-100/40 dark:border-slate-800 opacity-70'
                    : 'bg-white dark:bg-[#1C182A] border-purple-100/70 dark:border-purple-950/40 shadow-soft-sm'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => toggleTaskStatus(t.id)}
                    className="shrink-0 text-purple-500 hover:text-purple-600"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <p
                      className={`text-xs sm:text-sm font-semibold truncate ${
                        isCompleted
                          ? 'line-through text-slate-400'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {t.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span className="font-medium text-purple-600 dark:text-purple-400">
                        {t.category}
                      </span>
                      {t.startTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 inline" />
                          {t.startTime} {t.endTime ? `- ${t.endTime}` : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                    t.priority === 'High'
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40'
                      : t.priority === 'Medium'
                      ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40'
                      : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40'
                  }`}
                >
                  {t.priority}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
