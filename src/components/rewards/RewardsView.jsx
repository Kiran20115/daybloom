import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  Flame,
  Sprout,
  Trophy,
  Sparkles,
  Lock,
  CheckCircle2,
  Heart,
  BookOpen,
} from 'lucide-react';
import { triggerCelebrationConfetti } from '../common/FlowerConfetti';

export const RewardsView = () => {
  const { badges, user, tasks, habits, studySessions } = useApp();

  const unlockedBadges = badges.filter((b) => b.unlocked);
  const lockedBadges = badges.filter((b) => !b.unlocked);

  const completedTasksCount = tasks.filter((t) => t.status === 'Completed').length;
  const totalStudyMinutes = studySessions.reduce((acc, s) => acc + (s.durationMinutes || 0), 0);
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  const handleCelebrate = () => {
    triggerCelebrationConfetti();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-bloom">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>Milestones & Bloom Badges</span>
            <span className="text-xl">🏆</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Celebrate quiet victories, consistency streaks, and student milestones without pressure.
          </p>
        </div>

        <button
          onClick={handleCelebrate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 hover:from-purple-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-soft hover:shadow-glow-lavender transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Celebrate Progress 🌸</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-amber-100 dark:border-amber-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Consistency Streak</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {user.streak} Days
          </p>
          <p className="text-[11px] text-amber-600/80 dark:text-amber-400 mt-1">
            Active daily commitment
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Badges Unlocked</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">
            {unlockedBadges.length} / {badges.length}
          </p>
          <p className="text-[11px] text-purple-600/80 dark:text-purple-400 mt-1">
            Achievements blooming
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-emerald-100 dark:border-emerald-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Tasks Bloomed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {completedTasksCount}
          </p>
          <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400 mt-1">
            Total completed tasks
          </p>
        </div>
      </div>

      {/* Unlocked Badges */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Unlocked Badges ({unlockedBadges.length})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedBadges.map((badge) => (
            <div
              key={badge.id}
              className="p-5 rounded-3xl bg-gradient-to-br from-white via-purple-50/40 to-pink-50/30 dark:from-[#1C172C] dark:via-[#191428] dark:to-[#161223] border border-purple-200/70 dark:border-purple-800/40 shadow-soft flex items-start gap-4 hover:shadow-soft-lg transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-soft-sm">
                <Award className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {badge.title}
                  </h4>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
                    Unlocked
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {badge.description}
                </p>
                {badge.unlockedAt && (
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 mt-2 block font-medium">
                    Earned on {badge.unlockedAt}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked / In Progress Badges */}
      {lockedBadges.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Lock className="w-4 h-4 text-slate-400" />
            <span>Upcoming Milestones</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedBadges.map((badge) => (
              <div
                key={badge.id}
                className="p-5 rounded-3xl bg-white/60 dark:bg-[#181524]/60 border border-dashed border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{badge.description}</p>
                  {badge.progress !== undefined && (
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] font-semibold text-slate-400 mb-1">
                        <span>Progress</span>
                        <span>{badge.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-purple-400 h-full rounded-full"
                          style={{ width: `${badge.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gentle Encouragement Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-100/70 via-pink-100/50 to-white dark:from-[#211933] dark:via-[#1D162B] dark:to-[#171324] border border-purple-200/50 dark:border-purple-800/30 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-purple-600 shadow-soft shrink-0">
          <Heart className="w-6 h-6 fill-pink-200 dark:fill-pink-900" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            A Note on Gentle Productivity
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Streaks and badges are here to celebrate your effort, not to produce anxiety. If life happens or you feel tired, rest is productive too. DayBloom will be right here whenever you're ready to bloom again.
          </p>
        </div>
      </div>
    </div>
  );
};
