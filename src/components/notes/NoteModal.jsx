import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Pin, Tag, Sparkles } from 'lucide-react';

export const NoteModal = ({ isOpen, onClose, noteToEdit = null }) => {
  const { addNote, updateNote } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title || '');
      setContent(noteToEdit.content || '');
      setTags(noteToEdit.tags || []);
      setPinned(noteToEdit.pinned || false);
    } else {
      setTitle('');
      setContent('');
      setTags(['#ideas']);
      setPinned(false);
    }
    setTagInput('');
  }, [noteToEdit, isOpen]);

  const handleAddTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      let formatted = tagInput.trim();
      if (!formatted.startsWith('#')) formatted = '#' + formatted;
      if (!tags.includes(formatted)) setTags([...tags, formatted]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    if (noteToEdit) {
      updateNote(noteToEdit.id, {
        title: title.trim() || 'Untitled Note',
        content: content.trim(),
        tags,
        pinned,
      });
    } else {
      addNote({
        title: title.trim() || 'Untitled Note',
        content: content.trim(),
        tags,
        pinned,
        type: 'note',
      });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={noteToEdit ? 'Edit Note' : 'Write in Your Journal 📝'}
      subtitle="Capture thoughts, study notes, or quick ideas"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title..."
            className="flex-1 px-3 py-2 text-sm sm:text-base font-bold rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            type="button"
            onClick={() => setPinned(!pinned)}
            className={`p-2 rounded-xl transition-all ${
              pinned
                ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
            title={pinned ? 'Unpin note' : 'Pin note to top'}
          >
            <Pin className={`w-4 h-4 ${pinned ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        <div>
          <textarea
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write freely... You can use bullet points, summaries, code snippets, or thoughts."
            className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none leading-relaxed"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-pink-500" /> Tags
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center gap-1"
              >
                {t}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(t)}
                  className="hover:text-purple-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add tag and hit Enter..."
            className="w-full px-3 py-1.5 text-xs rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/30 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:outline-none"
          />
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
            {noteToEdit ? 'Save Changes' : 'Save Note 🌸'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
