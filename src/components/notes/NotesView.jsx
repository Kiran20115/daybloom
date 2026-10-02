import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { NoteModal } from './NoteModal';
import { DailyReflectionModal } from './DailyReflectionModal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { formatDisplayDate } from '../../utils/dateUtils';
import {
  BookOpenText,
  Plus,
  Search,
  Pin,
  Sparkles,
  Edit2,
  Trash2,
  Tag,
  Heart,
} from 'lucide-react';

export const NotesView = () => {
  const { notes, deleteNote, togglePinNote, searchQuery, setSearchQuery } = useApp();

  const [selectedTag, setSelectedTag] = useState('All');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [isReflectionModalOpen, setIsReflectionModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set();
    notes.forEach((n) => (n.tags || []).forEach((t) => set.add(t)));
    return ['All', ...Array.from(set)];
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = n.title.toLowerCase().includes(q);
        const matchContent = n.content?.toLowerCase().includes(q);
        const matchTag = n.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchContent && !matchTag) return false;
      }
      if (selectedTag !== 'All' && !(n.tags || []).includes(selectedTag)) {
        return false;
      }
      return true;
    });
  }, [notes, searchQuery, selectedTag]);

  const pinnedNotes = filteredNotes.filter((n) => n.pinned);
  const otherNotes = filteredNotes.filter((n) => !n.pinned);

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsNoteModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingNote(null);
    setIsNoteModalOpen(true);
  };

  const renderNoteCard = (note) => (
    <div
      key={note.id}
      className={`p-5 sm:p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between group relative ${
        note.pinned
          ? 'bg-gradient-to-br from-purple-50/70 via-pink-50/50 to-white dark:from-[#211A30] dark:via-[#1E172C] dark:to-[#171322] border-purple-200/80 dark:border-purple-800/40 shadow-soft'
          : 'bg-white dark:bg-[#181524] border-purple-100/70 dark:border-purple-900/30 shadow-soft hover:shadow-soft-lg'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
            {note.title}
          </h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => togglePinNote(note.id)}
              className={`p-1 rounded-lg transition-colors ${
                note.pinned
                  ? 'text-amber-500 hover:text-amber-600'
                  : 'text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100'
              }`}
              title={note.pinned ? 'Unpin' : 'Pin note'}
            >
              <Pin className={`w-3.5 h-3.5 ${note.pinned ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              onClick={() => handleEdit(note)}
              className="p-1 rounded-lg text-slate-400 hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setNoteToDelete(note)}
              className="p-1 rounded-lg text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed line-clamp-6 font-normal">
          {note.content}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-purple-50 dark:border-purple-900/20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {(note.tags || []).map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100/70 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="text-[10px] text-slate-400">
          {formatDisplayDate(note.updatedAt?.split('T')[0])}
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-bloom">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>Notes & Mindful Journal</span>
            <span className="text-xl">📝</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Capture study cheatsheets, key takeaways, and evening gratitude reflections.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsReflectionModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-pink-50 dark:bg-pink-950/50 border border-pink-200 dark:border-pink-800/40 text-pink-700 dark:text-pink-300 text-xs font-semibold hover:bg-pink-100 transition-all"
          >
            <Heart className="w-3.5 h-3.5 fill-pink-200 dark:fill-pink-900" />
            <span>Daily Reflection</span>
          </button>

          <button
            onClick={handleOpenNew}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-semibold shadow-soft hover:shadow-glow-lavender transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </button>
        </div>
      </div>

      {/* Tags Filter Toolbar */}
      {allTags.length > 1 && (
        <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-2xl bg-white/70 dark:bg-[#181524]/70 border border-purple-100/60 dark:border-purple-900/30">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-pink-400" /> Tags:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs px-2.5 py-1 rounded-xl transition-all ${
                selectedTag === tag
                  ? 'bg-purple-600 text-white font-bold shadow-soft-sm'
                  : 'bg-purple-50/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Pinned Section */}
      {pinnedNotes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Pinned Reflections & Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map(renderNoteCard)}
          </div>
        </div>
      )}

      {/* Other Notes Section */}
      <div className="space-y-3">
        {pinnedNotes.length > 0 && (
          <h3 className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            All Notes ({otherNotes.length})
          </h3>
        )}

        {otherNotes.length === 0 && pinnedNotes.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-white/60 dark:bg-[#181524]/60 border border-dashed border-purple-200 dark:border-purple-900/40 p-8">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-3xl mb-3">
              📝
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No notes found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Write down algorithms, key points from lectures, or your evening reflection.
            </p>
            <button
              onClick={handleOpenNew}
              className="mt-4 px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-200"
            >
              + Write First Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherNotes.map(renderNoteCard)}
          </div>
        )}
      </div>

      {/* Modals */}
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        noteToEdit={editingNote}
      />

      <DailyReflectionModal
        isOpen={isReflectionModalOpen}
        onClose={() => setIsReflectionModalOpen(false)}
      />

      <ConfirmDialog
        isOpen={!!noteToDelete}
        onClose={() => setNoteToDelete(null)}
        onConfirm={() => {
          if (noteToDelete) deleteNote(noteToDelete.id);
        }}
        title="Delete Note"
        message={`Are you sure you want to remove "${noteToDelete?.title}"?`}
      />
    </div>
  );
};
