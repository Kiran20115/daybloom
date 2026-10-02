import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Pause, RotateCcw, SkipForward, Coffee, Brain, Sparkles } from 'lucide-react';
import { triggerBloomConfetti } from '../common/FlowerConfetti';

export const PomodoroTimer = ({ onSessionComplete }) => {
  const { user, subjects, logStudySession, notify } = useApp();

  const settings = user.pomodoroSettings || {
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  };

  const [mode, setMode] = useState('focus'); // 'focus' | 'shortBreak' | 'longBreak'
  const [timeLeft, setTimeLeft] = useState(settings.focus * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '');
  const [sessionNotes, setSessionNotes] = useState('');

  const timerRef = useRef(null);

  // Sync when settings change
  useEffect(() => {
    if (!isRunning) {
      if (mode === 'focus') setTimeLeft(settings.focus * 60);
      else if (mode === 'shortBreak') setTimeLeft(settings.shortBreak * 60);
      else if (mode === 'longBreak') setTimeLeft(settings.longBreak * 60);
    }
  }, [settings, mode]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, mode, cycles, selectedSubjectId]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);

    if (mode === 'focus') {
      const newCycles = cycles + 1;
      setCycles(newCycles);

      // Log session automatically
      if (selectedSubjectId) {
        logStudySession({
          subjectId: selectedSubjectId,
          durationMinutes: settings.focus,
          notes: sessionNotes || 'Focused Pomodoro sprint',
          completedTopics: [],
          questionsSolved: 0,
        });
      }

      triggerBloomConfetti();
      notify(`🌿 Focus session complete! Time to take a mindful break.`, 'flower');

      // Next break
      if (newCycles % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(settings.longBreak * 60);
      } else {
        setMode('shortBreak');
        setTimeLeft(settings.shortBreak * 60);
      }
    } else {
      // Break finished
      notify(`✨ Break finished! Ready to blossom into your next focus block?`, 'info');
      setMode('focus');
      setTimeLeft(settings.focus * 60);
    }
  };

  const toggleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (mode === 'focus') setTimeLeft(settings.focus * 60);
    else if (mode === 'shortBreak') setTimeLeft(settings.shortBreak * 60);
    else setTimeLeft(settings.longBreak * 60);
  };

  const handleSwitchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === 'focus') setTimeLeft(settings.focus * 60);
    else if (newMode === 'shortBreak') setTimeLeft(settings.shortBreak * 60);
    else setTimeLeft(settings.longBreak * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalDuration =
    (mode === 'focus'
      ? settings.focus
      : mode === 'shortBreak'
      ? settings.shortBreak
      : settings.longBreak) * 60;
  const progressPercent = Math.round(((totalDuration - timeLeft) / totalDuration) * 100);

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 dark:from-[#1A1628] dark:via-[#1D172E] dark:to-[#171322] border border-purple-100 dark:border-purple-900/40 shadow-soft">
      {/* Mode Buttons */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => handleSwitchMode('focus')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            mode === 'focus'
              ? 'bg-purple-600 text-white shadow-soft'
              : 'bg-purple-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Focus ({settings.focus}m)</span>
        </button>
        <button
          onClick={() => handleSwitchMode('shortBreak')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            mode === 'shortBreak'
              ? 'bg-pink-500 text-white shadow-soft'
              : 'bg-pink-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" />
          <span>Short Break ({settings.shortBreak}m)</span>
        </button>
        <button
          onClick={() => handleSwitchMode('longBreak')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            mode === 'longBreak'
              ? 'bg-indigo-600 text-white shadow-soft'
              : 'bg-indigo-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Long Break ({settings.longBreak}m)</span>
        </button>
      </div>

      {/* Timer Display */}
      <div className="text-center my-4">
        <div className="inline-block relative">
          <span className="text-5xl sm:text-6xl font-extrabold tracking-tight font-mono text-slate-800 dark:text-slate-100">
            {formattedTime}
          </span>
          {/* Subtle bottom progress bar */}
          <div className="w-full bg-purple-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cycles count */}
        <p className="text-xs text-purple-600 dark:text-purple-300 font-semibold mt-3">
          Completed Focus Cycles: {cycles} / 4
        </p>
      </div>

      {/* Target Subject Selector */}
      {mode === 'focus' && (
        <div className="max-w-xs mx-auto mb-6">
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1 text-center">
            Currently Studying Subject
          </label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-purple-900/40 text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name} ({sub.code})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleReset}
          className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 border border-purple-100 dark:border-purple-900/30 transition-all shadow-soft-sm"
          title="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={toggleStartPause}
          className={`px-8 py-3 rounded-2xl font-bold text-sm text-white shadow-soft transition-all duration-200 flex items-center gap-2 active:scale-95 ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-600'
              : 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 hover:from-purple-600 hover:to-pink-600 hover:shadow-glow-lavender'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-white" /> Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" /> Start Focus
            </>
          )}
        </button>

        <button
          onClick={handleTimerComplete}
          className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-500 hover:text-purple-600 dark:hover:text-purple-300 border border-purple-100 dark:border-purple-900/30 transition-all shadow-soft-sm"
          title="Skip session"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
