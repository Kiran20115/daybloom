import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GoalModal } from './GoalModal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { formatDisplayDate } from '../../utils/dateUtils';
import {
  Target,
  Plus,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Edit2,
  Trash2,
  Award,
} from 'lucide-react';

export const GoalsView = () => {
  const { goals, toggleMilestone, deleteGoal } = useApp();

  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'completed' | 'all'
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [goalToDelete, setGoalToDelete] = useState(null);

  // Overall Goal metrics
  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.completed).length;
  const activeGoals = goals.filter((g) => !g.completed);
  const avgProgress =
    totalGoals > 0 ? Math.round(goals.reduce((acc, g) => acc + (g.progress || 0), 0) / totalGoals) : 0;

  const displayedGoals = goals.filter((g) => {
    if (activeTab === 'active') return !g.completed;
    if (activeTab === 'completed') return g.completed;
    return true;
  });

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setIsGoalModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingGoal(null);
    setIsGoalModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-bloom">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>Goals & Aspirations</span>
            <span className="text-xl">🎯</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Set intentional short & long-term targets and celebrate every milestone.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 hover:from-purple-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-soft hover:shadow-glow-lavender transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Goal</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft">
          <span className="text-xs font-semibold text-slate-400">Total Goals</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">
            {totalGoals}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#181524] border border-indigo-100 dark:border-indigo-900/30 shadow-soft">
          <span className="text-xs font-semibold text-slate-400">Active Quests</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
            {activeGoals.length}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#181524] border border-emerald-100 dark:border-emerald-900/30 shadow-soft">
          <span className="text-xs font-semibold text-slate-400">Achieved</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {completedGoals}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#181524] border border-pink-100 dark:border-pink-900/30 shadow-soft">
          <span className="text-xs font-semibold text-slate-400">Average Completion</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-pink-600 dark:text-pink-400 mt-1">
            {avgProgress}%
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-purple-100 dark:border-purple-900/30 pb-3">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'active'
              ? 'bg-purple-600 text-white shadow-soft'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          Active Goals ({activeGoals.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'completed'
              ? 'bg-purple-600 text-white shadow-soft'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          Completed ({completedGoals})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'all'
              ? 'bg-purple-600 text-white shadow-soft'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          All ({totalGoals})
        </button>
      </div>

      {/* Goals Cards List */}
      <div className="space-y-4">
        {displayedGoals.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-white/60 dark:bg-[#181524]/60 border border-dashed border-purple-200 dark:border-purple-900/40 p-8">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-3xl mb-3">
              🎯
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No goals in this view
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Set clear long-term goals or break your ambitions down into milestones.
            </p>
            <button
              onClick={handleOpenNew}
              className="mt-4 px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-200"
            >
              + Plant Goal Now
            </button>
          </div>
        ) : (
          displayedGoals.map((goal) => {
            const milestones = goal.milestones || [];
            const completedCount = milestones.filter((m) => m.completed).length;

            return (
              <div
                key={goal.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100/70 dark:border-purple-900/30 shadow-soft hover:shadow-soft-lg transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/50">
                        {goal.category}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {goal.type === 'short-term' ? 'Short-Term' : 'Long-Term'}
                      </span>
                      {goal.targetDate && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Due: {formatDisplayDate(goal.targetDate)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                      {goal.title}
                    </h3>
                    {goal.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {goal.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-start">
                    <button
                      onClick={() => handleEdit(goal)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setGoalToDelete(goal)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="my-4">
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold">
                      {goal.progress}% ({completedCount}/{milestones.length} milestones)
                    </span>
                  </div>
                  <div className="w-full bg-purple-100/70 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                {/* Milestones checklist */}
                {milestones.length > 0 && (
                  <div className="space-y-2 mt-4 pt-3 border-t border-purple-50 dark:border-purple-900/20">
                    <span className="text-xs font-semibold text-slate-400 block mb-1">
                      Checkpoints:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {milestones.map((m) => (
                        <div
                          key={m.id}
                          onClick={() => toggleMilestone(goal.id, m.id)}
                          className="flex items-center gap-2 p-2 rounded-xl bg-purple-50/30 dark:bg-slate-800/30 border border-purple-50/60 dark:border-purple-900/10 cursor-pointer hover:bg-purple-50 transition-all text-xs"
                        >
                          <input
                            type="checkbox"
                            checked={m.completed}
                            onChange={() => {}}
                            className="rounded text-purple-600 focus:ring-purple-400 pointer-events-none"
                          />
                          <span
                            className={
                              m.completed
                                ? 'line-through text-slate-400'
                                : 'text-slate-700 dark:text-slate-200'
                            }
                          >
                            {m.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modals */}
      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        goalToEdit={editingGoal}
      />

      <ConfirmDialog
        isOpen={!!goalToDelete}
        onClose={() => setGoalToDelete(null)}
        onConfirm={() => {
          if (goalToDelete) deleteGoal(goalToDelete.id);
        }}
        title="Delete Goal"
        message={`Are you sure you want to remove "${goalToDelete?.title}"?`}
      />
    </div>
  );
};
