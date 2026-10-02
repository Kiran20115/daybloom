import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { formatDisplayDate, formatDate } from '../../utils/dateUtils';
import { Sparkles, Heart, Trophy, Compass } from 'lucide-react';
import { triggerBloomConfetti } from '../common/FlowerConfetti';

export const DailyReflectionModal = ({ isOpen, onClose }) => {
  const { addNote, notify } = useApp();

  const [achievements, setAchievements] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [learnings, setLearnings] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!achievements.trim() && !gratitude.trim() && !learnings.trim()) return;

    const formattedContent = `### 🌟 Today's Daily Reflection (${formatDisplayDate(formatDate())})

**🏆 Highlights & Achievements:**
${achievements.trim() || 'Showed up and stayed persistent.'}

**💖 Things I Am Grateful For:**
${gratitude.trim() || 'Quiet focus and the gift of a new day.'}

**🌱 Learnings & Tomorrow's Intention:**
${learnings.trim() || 'Carry calmness and clarity forward.'}`;

    addNote({
      title: `🌸 Daily Reflection — ${formatDisplayDate(formatDate())}`,
      content: formattedContent,
      tags: ['#reflection', '#gratitude', '#daily'],
      pinned: true,
      type: 'reflection',
      reflectionData: {
        achievements,
        gratitude,
        learnings,
      },
    });

    triggerBloomConfetti();
    notify('Reflection lovingly saved in your journal 🌷', 'flower');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Daily Mindful Reflection 🌸"
      subtitle="Close your day with peace, celebrating your growth and counting blessings."
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Achievements */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            What were your quiet victories & achievements today?
          </label>
          <textarea
            rows={2}
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            placeholder="e.g. Solved 3 tough DSA problems, drank enough water, resisted procrastinating..."
            className="w-full p-2.5 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          />
        </div>

        {/* Gratitude */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-500" />
            3 things you are deeply grateful for right now:
          </label>
          <textarea
            rows={2}
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            placeholder="e.g. A warm cup of chai, supportive parents, good health, peaceful evening..."
            className="w-full p-2.5 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          />
        </div>

        {/* Learnings */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-500" />
            What did you learn today, or what is your intention for tomorrow?
          </label>
          <textarea
            rows={2}
            value={learnings}
            onChange={(e) => setLearnings(e.target.value)}
            placeholder="e.g. Take more regular screen breaks, start coding early in the morning..."
            className="w-full p-2.5 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-purple-50 dark:border-purple-900/30">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-soft"
          >
            Bloom Reflection 🌸
          </button>
        </div>
      </form>
    </Modal>
  );
};
