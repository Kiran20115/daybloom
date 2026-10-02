import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/dateUtils';
import { Plus, Sparkles } from 'lucide-react';

export const QuickAddTask = ({ defaultCategory = 'Study' }) => {
  const { addTask } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(defaultCategory);
  const [priority, setPriority] = useState('Medium');

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: '',
      category,
      priority,
      dueDate: formatDate(),
      status: 'Pending',
      tags: ['#quick'],
      subtasks: [],
    });
    setTitle('');
  };

  return (
    <form
      onSubmit={handleQuickAdd}
      className="p-2 sm:p-2.5 rounded-2xl bg-white/90 dark:bg-[#181524]/90 border border-purple-100 dark:border-purple-900/30 shadow-soft flex flex-wrap sm:flex-nowrap items-center gap-2"
    >
      <div className="flex items-center gap-2 flex-1 w-full pl-2">
        <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quick add a task for today (Press Enter)..."
          className="w-full bg-transparent text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-xs px-2.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/30 text-purple-800 dark:text-purple-200 focus:outline-none"
        >
          <option value="Study">Study 📚</option>
          <option value="Project">Project 💻</option>
          <option value="Health">Health 🌿</option>
          <option value="Personal">Personal ✨</option>
          <option value="Reading">Reading 📖</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="text-xs px-2.5 py-1.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-100 dark:border-pink-900/30 text-pink-800 dark:text-pink-200 focus:outline-none"
        >
          <option value="High">High 🔴</option>
          <option value="Medium">Medium 🟡</option>
          <option value="Low">Low 🟢</option>
        </select>

        <button
          type="submit"
          disabled={!title.trim()}
          className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition-all shadow-soft"
          aria-label="Add task"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
