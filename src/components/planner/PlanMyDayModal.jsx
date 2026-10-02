import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { formatDate } from '../../utils/dateUtils';
import { Sparkles, Check, Target, Clock, ArrowRight } from 'lucide-react';
import { triggerBloomConfetti } from '../common/FlowerConfetti';

export const PlanMyDayModal = ({ isOpen, onClose }) => {
  const { tasks, updateTask, notify } = useApp();
  const todayStr = formatDate();

  // Pending tasks eligible to be planned for today
  const candidateTasks = tasks.filter((t) => t.status !== 'Completed');

  const [selectedTaskIds, setSelectedTaskIds] = useState(() => {
    // default to existing high priority tasks for today
    return tasks
      .filter((t) => t.dueDate === todayStr && t.priority === 'High' && t.status !== 'Completed')
      .map((t) => t.id)
      .slice(0, 3);
  });

  const toggleSelect = (taskId) => {
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds(selectedTaskIds.filter((id) => id !== taskId));
    } else {
      if (selectedTaskIds.length >= 3) {
        notify('Focus rule: Pick at most 3 core priorities for maximum deep work!', 'info');
        return;
      }
      setSelectedTaskIds([...selectedTaskIds, taskId]);
    }
  };

  const handleSavePlan = () => {
    // Mark selected as High priority and due today
    selectedTaskIds.forEach((id) => {
      updateTask(id, {
        dueDate: todayStr,
        priority: 'High',
      });
    });

    triggerBloomConfetti();
    notify(`Day planned! Your ${selectedTaskIds.length} priorities are set for deep bloom 🌷`, 'flower');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Plan My Day 🌷"
      subtitle="Select up to 3 core focal points to conquer today without stress."
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        <div className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/30 text-xs text-purple-800 dark:text-purple-200 flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
          <span>
            The Ivy Lee method recommends choosing only 3 paramount priorities each morning.
          </span>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {candidateTasks.length === 0 ? (
            <p className="text-xs text-center text-slate-400 py-6">
              No pending tasks available to plan. Add some tasks first!
            </p>
          ) : (
            candidateTasks.map((t) => {
              const isSelected = selectedTaskIds.includes(t.id);
              return (
                <div
                  key={t.id}
                  onClick={() => toggleSelect(t.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-100/70 dark:bg-purple-900/40 border-purple-400 dark:border-purple-600 shadow-soft-sm'
                      : 'bg-white dark:bg-slate-800/40 border-purple-50 dark:border-purple-900/20 hover:bg-purple-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-purple-600 text-white'
                          : 'border border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-xs sm:text-sm font-semibold truncate ${
                          isSelected
                            ? 'text-purple-900 dark:text-purple-100'
                            : 'text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {t.title}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {t.category} • Due: {t.dueDate || 'Flexible'}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                      t.priority === 'High'
                        ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-purple-50 dark:border-purple-900/30">
          <span className="text-xs text-slate-500 font-medium">
            {selectedTaskIds.length} of 3 selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePlan}
              disabled={selectedTaskIds.length === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-soft"
            >
              Confirm Daily Plan 🌸
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
