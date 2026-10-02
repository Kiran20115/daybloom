import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PomodoroTimer } from './PomodoroTimer';
import { SubjectModal } from './SubjectModal';
import { StudyLogModal } from './StudyLogModal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { formatMinutesToHours, formatDisplayDate } from '../../utils/dateUtils';
import {
  GraduationCap,
  Plus,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Clock,
  Edit2,
  Trash2,
  Flame,
  Award,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

export const StudyTrackerView = () => {
  const { subjects, studySessions, deleteSubject, user } = useApp();

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  // Aggregate stats
  const totalStudyMinutes = subjects.reduce((acc, s) => acc + (s.totalMinutes || 0), 0);
  const totalQuestionsSolved = subjects.reduce((acc, s) => acc + (s.practiceQuestions || 0), 0);
  const totalTopicsCovered = subjects.reduce((acc, s) => acc + (s.topicsCount || 0), 0);

  // Recharts data for subjects
  const subjectChartData = subjects.map((s) => ({
    name: s.code || s.name,
    fullName: s.name,
    hours: Number(((s.totalMinutes || 0) / 60).toFixed(1)),
    color: s.color || '#A855F7',
  }));

  const handleOpenNewSubject = () => {
    setEditingSubject(null);
    setIsSubjectModalOpen(true);
  };

  const handleEditSubject = (sub) => {
    setEditingSubject(sub);
    setIsSubjectModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-bloom">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>Study Studio & Focus Lounge</span>
            <span className="text-xl">📚</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Pomodoro sprints, topic mastery, and consistent deep work for students.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-200 transition-all"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Log Past Session</span>
          </button>

          <button
            onClick={handleOpenNewSubject}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-semibold shadow-soft hover:shadow-glow-lavender transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Subject</span>
          </button>
        </div>
      </div>

      {/* Top 3 Study Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Total Study Time</span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            {formatMinutesToHours(totalStudyMinutes)}
          </p>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-1">
            Logged across {subjects.length} subjects
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-pink-100 dark:border-pink-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Questions Solved</span>
            <Award className="w-4 h-4 text-pink-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-pink-600 dark:text-pink-400">
            {totalQuestionsSolved}
          </p>
          <p className="text-[11px] text-pink-600/80 dark:text-pink-400 mt-1">
            Practice problems mastered
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-emerald-100 dark:border-emerald-900/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Topics Mastered</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {totalTopicsCovered}
          </p>
          <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400 mt-1">
            Key concepts checked off
          </p>
        </div>
      </div>

      {/* Pomodoro Timer Centerpiece */}
      <PomodoroTimer />

      {/* Subjects Grid & Visual Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subjects Cards (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span>Study Subjects</span>
            </h3>
            <span className="text-xs text-slate-400">{subjects.length} active</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map((sub) => {
              const currentHours = (sub.totalMinutes || 0) / 60;
              const target = sub.targetHoursWeek || 5;
              const progressPct = Math.min(100, Math.round((currentHours / target) * 100));

              return (
                <div
                  key={sub.id}
                  className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100/70 dark:border-purple-900/30 shadow-soft hover:shadow-soft-lg transition-all relative group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ backgroundColor: sub.color }}
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          {sub.name}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-semibold">
                          {sub.code}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditSubject(sub)}
                        className="p-1 rounded-lg text-slate-400 hover:text-purple-600"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSubjectToDelete(sub)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Progress towards weekly target */}
                  <div className="space-y-1.5 my-3">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500 dark:text-slate-400">Weekly Goal</span>
                      <span className="text-purple-600 dark:text-purple-400">
                        {currentHours.toFixed(1)} / {target} hrs ({progressPct}%)
                      </span>
                    </div>
                    <div className="w-full bg-purple-50 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progressPct}%`,
                          backgroundColor: sub.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Sub stats */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-50 dark:border-purple-900/20 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Topics</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        {sub.topicsCount || 0} covered
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Questions</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        {sub.practiceQuestions || 0} solved
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Time Breakdown Chart & Recent Sessions */}
        <div className="space-y-6">
          {/* Recharts Hours per Subject */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
              Study Time per Subject (Hours)
            </h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectChartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 10 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 10 }}
                  />
                  <Tooltip
                    formatter={(val, name, item) => [`${val} hours`, item.payload.fullName]}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '16px',
                      fontSize: '11px',
                      border: '1px solid #E9D5FF',
                    }}
                  />
                  <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                    {subjectChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Study Sessions */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#181524] border border-purple-100 dark:border-purple-900/30 shadow-soft">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
              Recent Deep Work Logs
            </h3>
            <div className="space-y-2.5 max-h-60 overflow-y-auto">
              {studySessions.slice(0, 5).map((sess) => {
                const sub = subjects.find((s) => s.id === sess.subjectId);
                return (
                  <div
                    key={sess.id}
                    className="p-3 rounded-2xl bg-purple-50/40 dark:bg-slate-800/40 border border-purple-50 dark:border-purple-900/20 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {sub?.name || 'General Study'}
                      </span>
                      <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                        {sess.durationMinutes}m • {formatDisplayDate(sess.date)}
                      </span>
                    </div>
                    {sess.notes && (
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] line-clamp-1">
                        {sess.notes}
                      </p>
                    )}
                    {sess.questionsSolved > 0 && (
                      <span className="text-[10px] text-pink-600 dark:text-pink-400 font-semibold mt-1 inline-block">
                        +{sess.questionsSolved} questions solved
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SubjectModal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        subjectToEdit={editingSubject}
      />

      <StudyLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
      />

      <ConfirmDialog
        isOpen={!!subjectToDelete}
        onClose={() => setSubjectToDelete(null)}
        onConfirm={() => {
          if (subjectToDelete) deleteSubject(subjectToDelete.id);
        }}
        title="Delete Subject"
        message={`Are you sure you want to delete ${subjectToDelete?.name}?`}
      />
    </div>
  );
};
