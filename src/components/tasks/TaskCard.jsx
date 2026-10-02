import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDisplayDate, isPastDue, isToday } from '../../utils/dateUtils';
import {
  Check,
  Clock,
  Calendar,
  MoreVertical,
  Edit2,
  Copy,
  Trash2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Folder,
} from 'lucide-react';

export const TaskCard = ({ task, onEdit, onDeleteRequest }) => {
  const { toggleTaskStatus, toggleSubtask, duplicateTask } = useApp();
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const isCompleted = task.status === 'Completed';
  const overdue = isPastDue(task.dueDate, task.status);
  const dueToday = isToday(task.dueDate);

  const subtasksCount = task.subtasks?.length || 0;
  const completedSubtasksCount = task.subtasks?.filter((s) => s.completed).length || 0;
  const subtaskProgress =
    subtasksCount > 0 ? Math.round((completedSubtasksCount / subtasksCount) * 100) : 0;

  const priorityStyles = {
    High: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200/50',
    Medium: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/50',
    Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/50',
  };

  const categoryStyles = {
    Study: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200/40',
    Project: 'bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300 border-pink-200/40',
    Health: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200/40',
    Personal: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200/40',
    Reading: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200/40',
    Admin: 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200/40',
  };

  return (
    <div
      className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-200 border ${
        isCompleted
          ? 'bg-white/50 dark:bg-slate-900/30 border-purple-100/40 dark:border-slate-800 opacity-75'
          : overdue
          ? 'bg-white dark:bg-[#1A1523] border-rose-200 dark:border-rose-900/40 shadow-soft'
          : 'bg-white dark:bg-[#181524] border-purple-100/70 dark:border-purple-950/50 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Interactive Bloom Checkbox */}
        <button
          onClick={() => toggleTaskStatus(task.id)}
          className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
            isCompleted
              ? 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-soft-sm scale-95'
              : 'border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 bg-white/80 dark:bg-slate-800'
          }`}
          aria-label={isCompleted ? 'Mark pending' : 'Mark completed'}
        >
          {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            {/* Category & Priority */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  categoryStyles[task.category] || categoryStyles.Study
                }`}
              >
                {task.category}
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                  priorityStyles[task.priority] || priorityStyles.Medium
                }`}
              >
                {task.priority} Priority
              </span>
              {overdue && (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border border-rose-300/50 animate-pulse">
                  <AlertTriangle className="w-3 h-3" /> Overdue
                </span>
              )}
            </div>

            {/* Actions Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {showMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                  <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-[#1C182B] rounded-2xl shadow-soft-xl border border-purple-100 dark:border-purple-900/40 p-1.5 z-20 animate-bloom text-xs">
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onEdit(task);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-purple-500" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        duplicateTask(task.id);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5 text-indigo-500" /> Duplicate
                    </button>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onDeleteRequest(task);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <h4
            className={`text-sm sm:text-base font-semibold transition-all ${
              isCompleted
                ? 'line-through text-slate-400 dark:text-slate-500 font-normal'
                : 'text-slate-800 dark:text-slate-100'
            }`}
          >
            {task.title}
          </h4>

          {/* Description */}
          {task.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Meta Info: Date & Time */}
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500 dark:text-slate-400">
            <div
              className={`flex items-center gap-1 ${
                dueToday ? 'text-purple-600 dark:text-purple-400 font-medium' : ''
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{dueToday ? 'Today' : formatDisplayDate(task.dueDate)}</span>
            </div>

            {(task.startTime || task.endTime) && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {task.startTime}
                  {task.endTime ? ` - ${task.endTime}` : ''}
                </span>
              </div>
            )}

            {/* Subtasks pill */}
            {subtasksCount > 0 && (
              <button
                onClick={() => setShowSubtasks(!showSubtasks)}
                className="flex items-center gap-1 text-[11px] font-medium text-purple-600 dark:text-purple-300 hover:underline"
              >
                <span>
                  {completedSubtasksCount}/{subtasksCount} steps
                </span>
                {showSubtasks ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>
            )}
          </div>

          {/* Subtasks Progress Bar & Checklist */}
          {subtasksCount > 0 && (
            <div className="mt-2.5">
              <div className="w-full bg-purple-100/60 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${subtaskProgress}%` }}
                />
              </div>

              {showSubtasks && (
                <div className="mt-3 space-y-1.5 pl-1 border-l-2 border-purple-100 dark:border-purple-900/30">
                  {task.subtasks.map((st) => (
                    <div
                      key={st.id}
                      onClick={() => toggleSubtask(task.id, st.id)}
                      className="flex items-center gap-2 cursor-pointer text-xs py-0.5 group/st"
                    >
                      <input
                        type="checkbox"
                        checked={st.completed}
                        onChange={() => {}}
                        className="rounded text-purple-600 focus:ring-purple-400 pointer-events-none"
                      />
                      <span
                        className={`transition-colors ${
                          st.completed
                            ? 'line-through text-slate-400'
                            : 'text-slate-600 dark:text-slate-300 group-hover/st:text-purple-600'
                        }`}
                      >
                        {st.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-purple-50/70 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
