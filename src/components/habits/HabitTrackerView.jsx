import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HabitHeatmap } from './HabitHeatmap';
import { HabitModal } from './HabitModal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { formatDate, getPastNDays, formatDisplayDate } from '../../utils/dateUtils';
import {
  Sprout,
  Plus,
  Flame,
  Check,
  Edit2,
  Trash2,
  Archive,
  Award,
  Sparkles,
  Heart,
} from 'lucide-react';

export const HabitTrackerView = () => {
  const { habits, toggleHabitDate, deleteHabit, updateHabit } = useApp();

  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [viewTab, setViewTab] = useState('weekly'); // 'weekly' | 'heatmap'

  const todayStr = formatDate();
  const past7Days = getPastNDays(7);

  const activeHabits = habits.filter((h) => !h.archived);

  // Overall completion rate for today
  const completedTodayCount = activeHabits.filter((h) => h.completedDates?.[todayStr]).length;
  const todayRate = activeHabits.length > 0 ? Math.round((completedTodayCount / activeHabits.length) * 100) : 0;

  // Best streak overall
  const longestStreak = Math.max(0, ...habits.map((h) => h.bestStreak || h.streak || 0));

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setIsHabitModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingHabit(null);
    setIsHabitModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-bloom">
      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>Habit Sanctuary</span>
            <span className="text-xl">🌱</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Nurture your daily wellness, study rituals, and personal growth rituals.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenNew}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 hover:from-purple-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-soft hover:shadow-glow-lavender transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Seed Habit</span>
          </button>
        </div>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Today's Rituals</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            {completedTodayCount} / {activeHabits.length}
          </p>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-1">
            {todayRate}% of daily habits bloomed
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-amber-100 dark:border-amber-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Longest Habit Streak</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {longestStreak} Days
          </p>
          <p className="text-[11px] text-amber-600/80 dark:text-amber-400 mt-1">
            Pure consistency at work
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-emerald-100 dark:border-emerald-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Active Habits</span>
            <Sprout className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {activeHabits.length}
          </p>
          <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400 mt-1">
            Planting healthy daily routines
          </p>
        </div>
      </div>

      {/* View Switcher: Weekly Overview vs 90-day Heatmap */}
      <div className="flex items-center gap-2 border-b border-purple-100 dark:border-purple-900/30 pb-3">
        <button
          onClick={() => setViewTab('weekly')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            viewTab === 'weekly'
              ? 'bg-purple-600 text-white shadow-soft'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          Weekly Consistency Matrix
        </button>
        <button
          onClick={() => setViewTab('heatmap')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            viewTab === 'heatmap'
              ? 'bg-purple-600 text-white shadow-soft'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          90-Day Habit Heatmap
        </button>
      </div>

      {/* Weekly Matrix View */}
      {viewTab === 'weekly' ? (
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-purple-100/60 dark:border-purple-900/30 pb-3">
                <th className="py-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Habit & Streak
                </th>
                {past7Days.map((dStr) => {
                  const dObj = new Date(dStr + 'T00:00:00');
                  const dayLetter = dObj.toLocaleDateString('en-US', { weekday: 'narrow' });
                  const dayNum = dObj.getDate();
                  const isTodayCol = dStr === todayStr;

                  return (
                    <th
                      key={dStr}
                      className={`text-center py-2 px-2 text-xs font-semibold ${
                        isTodayCol ? 'text-purple-600 dark:text-purple-400 font-extrabold' : 'text-slate-400'
                      }`}
                    >
                      <span className="block text-[10px]">{dayLetter}</span>
                      <span className="text-xs">{dayNum}</span>
                    </th>
                  );
                })}
                <th className="py-3 px-3 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50 dark:divide-purple-900/20">
              {activeHabits.map((h) => (
                <tr key={h.id} className="hover:bg-purple-50/20 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: h.color || '#A855F7' }}
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {h.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">
                            {h.category}
                          </span>
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-0.5">
                            <Flame className="w-3 h-3" /> {h.streak}d streak
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 7 Day Checkboxes */}
                  {past7Days.map((dStr) => {
                    const isDone = !!h.completedDates?.[dStr];
                    const isTodayCol = dStr === todayStr;

                    return (
                      <td key={dStr} className="text-center py-3 px-2">
                        <button
                          onClick={() => toggleHabitDate(h.id, dStr)}
                          className={`w-7 h-7 mx-auto rounded-xl flex items-center justify-center transition-all duration-200 ${
                            isDone
                              ? 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-soft-sm scale-105'
                              : isTodayCol
                              ? 'border-2 border-dashed border-purple-300 dark:border-purple-700 hover:border-purple-500 bg-purple-50/40 dark:bg-slate-800/50'
                              : 'border border-slate-200 dark:border-slate-700/60 hover:border-slate-400 bg-white/60 dark:bg-slate-800/30'
                          }`}
                          title={`Toggle ${h.name} on ${formatDisplayDate(dStr)}`}
                        >
                          {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>
                      </td>
                    );
                  })}

                  {/* Edit / Delete actions */}
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleEdit(h)}
                        className="p-1 rounded-lg text-slate-400 hover:text-purple-600 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setHabitToDelete(h)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Heatmap View */
        <div className="p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft">
          <HabitHeatmap habits={activeHabits} />
        </div>
      )}

      {/* Gentle Non-Guilt Banner */}
      <div className="p-5 rounded-3xl bg-purple-50/60 dark:bg-[#181426] border border-purple-100 dark:border-purple-900/30 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-pink-500 shadow-soft-sm shrink-0">
          <Heart className="w-5 h-5 fill-pink-100 dark:fill-pink-950" />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
            A Mindful Habit Reminder
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Missing a day is part of being human. What matters is gently restarting the next morning without self-criticism. Every bloom begins with patience.
          </p>
        </div>
      </div>

      {/* Modals */}
      <HabitModal
        isOpen={isHabitModalOpen}
        onClose={() => setIsHabitModalOpen(false)}
        habitToEdit={editingHabit}
      />

      <ConfirmDialog
        isOpen={!!habitToDelete}
        onClose={() => setHabitToDelete(null)}
        onConfirm={() => {
          if (habitToDelete) deleteHabit(habitToDelete.id);
        }}
        title="Delete Habit"
        message={`Are you sure you want to remove ${habitToDelete?.name}?`}
      />
    </div>
  );
};
