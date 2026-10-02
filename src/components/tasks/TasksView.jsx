import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { TaskCard } from './TaskCard';
import { QuickAddTask } from '../dashboard/QuickAddTask';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { formatDate, isPastDue, isToday } from '../../utils/dateUtils';
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Inbox,
  AlertCircle,
} from 'lucide-react';

const CATEGORIES = ['All', 'Study', 'Project', 'Health', 'Personal', 'Reading', 'Admin'];
const PRIORITIES = ['All', 'High', 'Medium', 'Low'];
const GROUPS = [
  { id: 'today', label: 'Today', icon: Clock },
  { id: 'upcoming', label: 'Upcoming', icon: Calendar },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 },
  { id: 'all', label: 'All Tasks', icon: Inbox },
];

export const TasksView = () => {
  const {
    tasks,
    deleteTask,
    setIsTaskModalOpen,
    setEditingTask,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [activeGroup, setActiveGroup] = useState('today');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate' | 'priority' | 'created'
  const [taskToDelete, setTaskToDelete] = useState(null);

  const todayStr = formatDate();

  // Filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(query);
        const matchesDesc = t.description?.toLowerCase().includes(query);
        const matchesTags = t.tags?.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTags) return false;
      }

      // Grouping tab
      if (activeGroup === 'today') {
        if (t.status === 'Completed') return false;
        // Include today or overdue
        if (t.dueDate !== todayStr && !isPastDue(t.dueDate, t.status)) return false;
      } else if (activeGroup === 'upcoming') {
        if (t.status === 'Completed') return false;
        if (t.dueDate <= todayStr) return false;
      } else if (activeGroup === 'completed') {
        if (t.status !== 'Completed') return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && t.category !== selectedCategory) {
        return false;
      }

      // Priority filter
      if (selectedPriority !== 'All' && t.priority !== selectedPriority) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priority') {
        const weight = { High: 3, Medium: 2, Low: 1 };
        return (weight[b.priority] || 0) - (weight[a.priority] || 0);
      }
      if (sortBy === 'created') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      // default: dueDate
      if (a.dueDate === b.dueDate) {
        return (a.startTime || '').localeCompare(b.startTime || '');
      }
      return (a.dueDate || '').localeCompare(b.dueDate || '');
    });
  }, [tasks, searchQuery, activeGroup, selectedCategory, selectedPriority, sortBy, todayStr]);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleOpenNewTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-bloom">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>My Tasks Garden</span>
            <span className="text-xl">🌸</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Organize study priorities, milestones, and personal actions seamlessly.
          </p>
        </div>

        <button
          onClick={handleOpenNewTask}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 hover:from-purple-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-soft hover:shadow-glow-lavender transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Quick Add Bar */}
      <QuickAddTask defaultCategory={selectedCategory !== 'All' ? selectedCategory : 'Study'} />

      {/* Group Navigation Tabs (Today, Upcoming, Completed, All) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-purple-100 dark:border-purple-900/30 pb-3">
        {GROUPS.map((grp) => {
          const Icon = grp.icon;
          const isActive = activeGroup === grp.id;
          let count = 0;
          if (grp.id === 'today') {
            count = tasks.filter((t) => t.status !== 'Completed' && (t.dueDate === todayStr || isPastDue(t.dueDate, t.status))).length;
          } else if (grp.id === 'upcoming') {
            count = tasks.filter((t) => t.status !== 'Completed' && t.dueDate > todayStr).length;
          } else if (grp.id === 'completed') {
            count = tasks.filter((t) => t.status === 'Completed').length;
          } else {
            count = tasks.length;
          }

          return (
            <button
              key={grp.id}
              onClick={() => setActiveGroup(grp.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-purple-600 text-white shadow-soft'
                  : 'bg-white dark:bg-[#181524] text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-purple-100/60 dark:border-purple-900/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{grp.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-[#181524]/80 border border-purple-100/70 dark:border-purple-900/30 shadow-soft-sm flex flex-wrap items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-2.5 py-1 rounded-xl transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200 font-bold border border-purple-300/60 dark:border-purple-700/60'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Priority & Sort dropdowns */}
        <div className="flex items-center gap-2">
          {/* Priority */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-xl bg-purple-50/70 dark:bg-slate-800 border border-purple-100 dark:border-purple-900/30 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          {/* Sort By */}
          <div className="flex items-center gap-1 bg-purple-50/70 dark:bg-slate-800 px-2 py-1 rounded-xl border border-purple-100 dark:border-purple-900/30">
            <ArrowUpDown className="w-3.5 h-3.5 text-purple-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-transparent text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="created">Recently Created</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white/60 dark:bg-[#181524]/60 border border-dashed border-purple-200 dark:border-purple-900/40 p-8">
          <div className="w-14 h-14 mx-auto rounded-3xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-3xl mb-3">
            🌷
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No tasks found in this view
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? 'Try changing your search query or clear the active filters.'
              : activeGroup === 'completed'
              ? 'Completed tasks will be recorded here like dried pressed flowers in a notebook.'
              : 'Plant a new task above or relax and enjoy your peaceful afternoon.'}
          </p>
          <button
            onClick={handleOpenNewTask}
            className="mt-4 px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-200"
          >
            + Add Task Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDeleteRequest={(t) => setTaskToDelete(t)}
            />
          ))}
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={() => {
          if (taskToDelete) deleteTask(taskToDelete.id);
        }}
        title="Delete Task"
        message={`Are you sure you want to remove "${taskToDelete?.title}" from your garden?`}
        confirmText="Remove"
        confirmVariant="danger"
      />
    </div>
  );
};
