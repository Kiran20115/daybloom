import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';

const PRESET_ICONS = ['Sparkles', 'Droplets', 'Terminal', 'Activity', 'BookOpen', 'Feather', 'Moon', 'Heart', 'Smile', 'Sun'];
const PRESET_COLORS = ['#A855F7', '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#14B8A6'];
const CATEGORIES = ['Mindfulness', 'Health', 'Growth', 'Learning', 'Rest', 'Wellness'];

export const HabitModal = ({ isOpen, onClose, habitToEdit = null }) => {
  const { addHabit, updateHabit } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Mindfulness');
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [icon, setIcon] = useState(PRESET_ICONS[0]);

  useEffect(() => {
    if (habitToEdit) {
      setName(habitToEdit.name || '');
      setCategory(habitToEdit.category || 'Mindfulness');
      setColor(habitToEdit.color || PRESET_COLORS[0]);
      setIcon(habitToEdit.icon || PRESET_ICONS[0]);
    } else {
      setName('');
      setCategory('Mindfulness');
      setColor(PRESET_COLORS[0]);
      setIcon(PRESET_ICONS[0]);
    }
  }, [habitToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (habitToEdit) {
      updateHabit(habitToEdit.id, {
        name: name.trim(),
        category,
        color,
        icon,
      });
    } else {
      addHabit({
        name: name.trim(),
        category,
        color,
        icon,
      });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={habitToEdit ? 'Edit Habit' : 'Seed a Healthy Habit 🌱'}
      subtitle="Consistency over intensity. Small daily rituals yield lifetime blooms."
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Habit Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Drink 2.5L water, 10m morning meditation, Code 1 DSA problem"
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Color Choice */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Theme Color
          </label>
          <div className="flex items-center gap-2">
            {PRESET_COLORS.map((c) => (
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
            {habitToEdit ? 'Update Habit' : 'Seed Habit 🌱'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
