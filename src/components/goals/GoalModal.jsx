import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { formatDate } from '../../utils/dateUtils';
import { Plus, Trash2, Calendar, Target, Flag } from 'lucide-react';

export const GoalModal = ({ isOpen, onClose, goalToEdit = null }) => {
  const { addGoal, updateGoal } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Career');
  const [type, setType] = useState('long-term'); // 'short-term' | 'long-term'
  const [targetDate, setTargetDate] = useState('');
  const [notes, setNotes] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [milestoneInput, setMilestoneInput] = useState('');

  useEffect(() => {
    if (goalToEdit) {
      setTitle(goalToEdit.title || '');
      setDescription(goalToEdit.description || '');
      setCategory(goalToEdit.category || 'Career');
      setType(goalToEdit.type || 'long-term');
      setTargetDate(goalToEdit.targetDate || '');
      setNotes(goalToEdit.notes || '');
      setMilestones(goalToEdit.milestones || []);
    } else {
      setTitle('');
      setDescription('');
      setCategory('Career');
      setType('long-term');
      setTargetDate('');
      setNotes('');
      setMilestones([]);
    }
    setMilestoneInput('');
  }, [goalToEdit, isOpen]);

  const handleAddMilestone = (e) => {
    e?.preventDefault();
    if (!milestoneInput.trim()) return;
    setMilestones([
      ...milestones,
      { id: 'm-' + Date.now(), title: milestoneInput.trim(), completed: false },
    ]);
    setMilestoneInput('');
  };

  const handleRemoveMilestone = (id) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      category,
      type,
      targetDate,
      notes: notes.trim(),
      milestones,
    };

    if (goalToEdit) {
      updateGoal(goalToEdit.id, payload);
    } else {
      addGoal(payload);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={goalToEdit ? 'Edit Goal' : 'Plant a North Star Goal 🎯'}
      subtitle="Break monumental aspirations into realistic sequential milestones"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Goal Vision *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Crack Google / Microsoft SWE Placement, Finish 10 Books"
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Why does this goal matter to your personal journey?"
            className="w-full px-3 py-2 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Time Horizon
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none"
            >
              <option value="short-term">Short-Term (This Month)</option>
              <option value="long-term">Long-Term (Semester/Year)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none"
            >
              <option value="Career">Career & Placement</option>
              <option value="Productivity">Productivity</option>
              <option value="Learning">Learning & Reading</option>
              <option value="Health">Health & Fitness</option>
              <option value="Personal">Personal Growth</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none"
            />
          </div>
        </div>

        {/* Milestones list */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Milestones & Checkpoints ({milestones.length})
          </label>
          <div className="space-y-1.5 mb-2 max-h-32 overflow-y-auto">
            {milestones.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between p-2 rounded-xl bg-purple-50/40 dark:bg-slate-800/30 border border-purple-50 text-xs"
              >
                <span className="text-slate-700 dark:text-slate-200">{m.title}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveMilestone(m.id)}
                  className="text-slate-400 hover:text-rose-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={milestoneInput}
              onChange={(e) => setMilestoneInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMilestone())}
              placeholder="Add next checkpoint (e.g. Finish Striver SDE sheet)..."
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddMilestone}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
            >
              Add
            </button>
          </div>
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
            {goalToEdit ? 'Save Changes' : 'Plant Goal 🌸'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
