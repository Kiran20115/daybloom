import React from 'react';
import { getPastMonthHeatmapDays, formatDisplayDate } from '../../utils/dateUtils';

export const HabitHeatmap = ({ habits, onToggleDate }) => {
  const days = getPastMonthHeatmapDays(84); // 12 weeks = 84 days

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="font-semibold">Consistency Heatmap (Last 12 Weeks)</span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span>Less</span>
          <span className="w-3 h-3 rounded bg-purple-100 dark:bg-purple-950/60 inline-block" />
          <span className="w-3 h-3 rounded bg-purple-300 dark:bg-purple-800 inline-block" />
          <span className="w-3 h-3 rounded bg-purple-500 inline-block" />
          <span className="w-3 h-3 rounded bg-purple-700 inline-block" />
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-max">
          {days.map((dStr) => {
            // Count how many habits were completed on this date
            const completedCount = habits.filter((h) => !h.archived && h.completedDates?.[dStr]).length;
            const totalHabits = habits.filter((h) => !h.archived).length;
            const ratio = totalHabits > 0 ? completedCount / totalHabits : 0;

            let bgColor = 'bg-purple-50 dark:bg-slate-800/60';
            if (ratio > 0.75) bgColor = 'bg-purple-600 dark:bg-purple-500';
            else if (ratio > 0.5) bgColor = 'bg-purple-400 dark:bg-purple-600';
            else if (ratio > 0.25) bgColor = 'bg-purple-300 dark:bg-purple-700';
            else if (ratio > 0) bgColor = 'bg-purple-200 dark:bg-purple-900';

            return (
              <div
                key={dStr}
                title={`${formatDisplayDate(dStr)}: ${completedCount} of ${totalHabits} habits completed`}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-md ${bgColor} heatmap-cell cursor-pointer`}
                onClick={() => onToggleDate && onToggleDate(dStr)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
