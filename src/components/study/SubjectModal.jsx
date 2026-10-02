import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';

const COLOR_OPTIONS = [
  '#A855F7', // lavender
  '#EC4899', // blush pink
  '#8B5CF6', // violet
  '#F97316', // peach
  '#14B8A6', // teal
  '#3B82F6', // sky
  '#10B981', // emerald
  '#F59E0B', // amber
];

export const SubjectModal = ({ isOpen, onClose, subjectToEdit = null }) => {
  const { addSubject, updateSubject } = useApp();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [targetHoursWeek, setTargetHoursWeek] = useState(6);

  useEffect(() => {
    if (subjectToEdit) {
      setName(subjectToEdit.name || '');
      setCode(subjectToEdit.code || '');
      setColor(subjectToEdit.color || COLOR_OPTIONS[0]);
      setTargetHoursWeek(subjectToEdit.targetHoursWeek || 6);
    } else {
      setName('');
      setCode('');
      setColor(COLOR_OPTIONS[0]);
      setTargetHoursWeek(6);
    }
  }, [subjectToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (subjectToEdit) {
      updateSubject(subjectToEdit.id, {
        name: name.trim(),
        code: code.trim() || name.substring(0, 4).toUpperCase(),
        color,
        targetHoursWeek: Number(targetHoursWeek) || 5,
      });
    } else {
      addSubject({
        name: name.trim(),
        code: code.trim() || name.substring(0, 4).toUpperCase(),
        color,
        targetHoursWeek: Number(targetHoursWeek) || 5,
      });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={subjectToEdit ? 'Edit Subject' : 'Add Study Subject 📚'}
      subtitle="Track your mastery, questions solved, and weekly targets"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Subject Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Data Structures & Algorithms, DBMS, Aptitude"
            className="w-full px-3.5 py-2 rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Short Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. DSA, DBMS"
              className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target (Hours/Week)
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={targetHoursWeek}
              onChange={(e) => setTargetHoursWeek(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Subject Color
          </label>
          <div className="flex items-center gap-2">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                className={`w-7 h-7 rounded-xl transition-transform ${
                  color === c ? 'scale-125 ring-2 ring-purple-400 ring-offset-2' : 'hover:scale-110'
                }`}
              />
            ))}
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
            {subjectToEdit ? 'Update Subject' : 'Save Subject 🌸'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
