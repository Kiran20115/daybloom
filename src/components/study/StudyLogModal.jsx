import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { formatDate } from '../../utils/dateUtils';
import { Clock, BookOpen, CheckCircle, Hash } from 'lucide-react';

export const StudyLogModal = ({ isOpen, onClose, defaultSubjectId = null }) => {
  const { subjects, logStudySession } = useApp();

  const [subjectId, setSubjectId] = useState(defaultSubjectId || subjects[0]?.id || '');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [date, setDate] = useState(formatDate());
  const [questionsSolved, setQuestionsSolved] = useState(5);
  const [topicInput, setTopicInput] = useState('');
  const [completedTopics, setCompletedTopics] = useState([]);
  const [notes, setNotes] = useState('');

  const handleAddTopic = (e) => {
    if (e.key === 'Enter' && topicInput.trim()) {
      e.preventDefault();
      if (!completedTopics.includes(topicInput.trim())) {
        setCompletedTopics([...completedTopics, topicInput.trim()]);
      }
      setTopicInput('');
    }
  };

  const handleRemoveTopic = (t) => {
    setCompletedTopics(completedTopics.filter((item) => item !== t));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectId) return;

    logStudySession({
      subjectId,
      durationMinutes: Number(durationMinutes) || 30,
      date,
      notes,
      completedTopics,
      questionsSolved: Number(questionsSolved) || 0,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log Study Session 📚"
      subtitle="Record your deep work, solved questions, and newly understood concepts"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Subject *
          </label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-purple-50/30 dark:bg-slate-800/50 border border-purple-100 dark:border-purple-900/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name} ({sub.code})
              </option>
            ))}
          </select>
        </div>

        {/* Duration & Questions Solved */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-purple-500" /> Duration (mins)
            </label>
            <input
              type="number"
              min="5"
              step="5"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-purple-50/30 dark:bg-slate-800/50 border border-purple-100 dark:border-purple-900/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Hash className="w-3.5 h-3.5 text-pink-500" /> Questions Solved
            </label>
            <input
              type="number"
              min="0"
              value={questionsSolved}
              onChange={(e) => setQuestionsSolved(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-purple-50/30 dark:bg-slate-800/50 border border-purple-100 dark:border-purple-900/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-purple-50/30 dark:bg-slate-800/50 border border-purple-100 dark:border-purple-900/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Topics Completed */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Completed Topics / Theorems
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {completedTopics.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50"
              >
                {topic}
                <button
                  type="button"
                  onClick={() => handleRemoveTopic(topic)}
                  className="hover:text-emerald-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            onKeyDown={handleAddTopic}
            placeholder="Type topic title & press Enter (e.g. Dijkstra Algorithm, BCNF)..."
            className="w-full px-3 py-2 text-xs rounded-xl bg-purple-50/30 dark:bg-slate-800/50 border border-purple-100 dark:border-purple-900/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Session Takeaways & Reflections
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What felt challenging? What clicked today?"
            className="w-full px-3 py-2 text-xs rounded-xl bg-purple-50/30 dark:bg-slate-800/50 border border-purple-100 dark:border-purple-900/40 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          />
        </div>

        {/* Actions */}
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
            Log Session 🌸
          </button>
        </div>
      </form>
    </Modal>
  );
};
