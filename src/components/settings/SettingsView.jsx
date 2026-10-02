import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ConfirmDialog } from '../common/ConfirmDialog';
import {
  User,
  Settings,
  Sun,
  Moon,
  Clock,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Check,
} from 'lucide-react';

const AVATAR_OPTIONS = ['🌷', '🌸', '🌿', '☕', '💻', '📚', '✨', '🦊', '🌙', '🦋'];

export const SettingsView = () => {
  const {
    user,
    updateUser,
    exportData,
    importData,
    resetToDemoData,
    clearToCleanWorkspace,
    notify,
  } = useApp();

  const [name, setName] = useState(user.name || 'Kiran');
  const [avatar, setAvatar] = useState(user.avatar || '🌷');
  const [startOfWeek, setStartOfWeek] = useState(user.startOfWeek || 'monday');
  const [dailyGoalHours, setDailyGoalHours] = useState(user.dailyGoalHours || 4);
  const [dailyTasksTarget, setDailyTasksTarget] = useState(user.dailyTasksTarget || 5);

  const [pomodoroFocus, setPomodoroFocus] = useState(user.pomodoroSettings?.focus || 25);
  const [pomodoroShortBreak, setPomodoroShortBreak] = useState(user.pomodoroSettings?.shortBreak || 5);
  const [pomodoroLongBreak, setPomodoroLongBreak] = useState(user.pomodoroSettings?.longBreak || 15);

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser({
      name: name.trim() || 'Friend',
      avatar,
      startOfWeek,
      dailyGoalHours: Number(dailyGoalHours) || 4,
      dailyTasksTarget: Number(dailyTasksTarget) || 5,
      pomodoroSettings: {
        ...user.pomodoroSettings,
        focus: Number(pomodoroFocus) || 25,
        shortBreak: Number(pomodoroShortBreak) || 5,
        longBreak: Number(pomodoroLongBreak) || 15,
      },
    });
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const success = importData(json);
        if (success) {
          notify('Backup successfully restored! Refreshing...', 'flower');
          setTimeout(() => window.location.reload(), 800);
        } else {
          notify('Failed to import backup.', 'info');
        }
      } catch (err) {
        notify('Invalid JSON file format.', 'info');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-bloom max-w-4xl">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span>Profile & Workspace Settings</span>
          <span className="text-xl">⚙️</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Customize your personal identity, Pomodoro cadences, themes, and backup data.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Profile Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-500" />
            <span>Personal Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kiran"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Choose Avatar Emblem
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform ${
                      avatar === av
                        ? 'bg-purple-100 dark:bg-purple-900/60 ring-2 ring-purple-500 scale-110'
                        : 'bg-slate-50 dark:bg-slate-800 hover:scale-105'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Appearance & Preferences */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Theme & Daily Targets</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Visual Theme
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateUser({ theme: 'light' })}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    user.theme !== 'dark'
                      ? 'bg-purple-600 text-white shadow-soft'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" /> Light
                </button>
                <button
                  type="button"
                  onClick={() => updateUser({ theme: 'dark' })}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    user.theme === 'dark'
                      ? 'bg-purple-600 text-white shadow-soft'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" /> Dark
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Daily Study Target (Hours)
              </label>
              <input
                type="number"
                min="1"
                max="16"
                value={dailyGoalHours}
                onChange={(e) => setDailyGoalHours(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Daily Tasks Goal (Count)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={dailyTasksTarget}
                onChange={(e) => setDailyTasksTarget(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Pomodoro Timer Customization */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <span>Pomodoro Focus Settings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Focus Duration (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="90"
                value={pomodoroFocus}
                onChange={(e) => setPomodoroFocus(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Short Break (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={pomodoroShortBreak}
                onChange={(e) => setPomodoroShortBreak(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Long Break (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="60"
                value={pomodoroLongBreak}
                onChange={(e) => setPomodoroLongBreak(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 hover:from-purple-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-soft hover:shadow-glow-lavender transition-all"
        >
          Save All Preferences 🌸
        </button>
      </form>

      {/* Data Management: Export, Import & Reset */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Download className="w-4 h-4 text-indigo-500" />
          <span>Data Storage & Portability</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          All your DayBloom tasks, notes, habits, and study logs are stored locally on your device with zero trackers. You can export a backup anytime.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Export JSON */}
          <button
            type="button"
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-100 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON Backup</span>
          </button>

          {/* Import JSON */}
          <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 transition-all cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Import Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>

          {/* Restore Starter Demo Data */}
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Demo Data</span>
          </button>

          {/* Clear to Clean Slate */}
          <button
            type="button"
            onClick={() => setIsClearConfirmOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/40 text-rose-700 dark:text-rose-300 text-xs font-semibold hover:bg-rose-100 transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Start Fresh Blank Slate</span>
          </button>
        </div>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={resetToDemoData}
        title="Restore Starter Demo Data"
        message="This will overwrite current items with DayBloom's initial student sample data (DSA tasks, habits, etc.)."
        confirmText="Restore Demo"
        confirmVariant="default"
      />

      <ConfirmDialog
        isOpen={isClearConfirmOpen}
        onClose={() => setIsClearConfirmOpen(false)}
        onConfirm={clearToCleanWorkspace}
        title="Clear to Blank Workspace"
        message="This will remove all tasks, habits, study logs, and notes to give you an entirely clean canvas."
        confirmText="Clear All Data"
        confirmVariant="danger"
      />
    </div>
  );
};
