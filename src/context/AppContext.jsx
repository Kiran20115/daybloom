import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USER,
  INITIAL_TASKS,
  INITIAL_SUBJECTS,
  INITIAL_STUDY_SESSIONS,
  INITIAL_HABITS,
  INITIAL_GOALS,
  INITIAL_NOTES,
  BADGES_LIST,
  MOTIVATIONAL_QUOTES,
} from './defaultData';
import { loadFromStorage, saveToStorage, exportAllData, importAllData, clearAllDayBloomData } from '../utils/storage';
import {
  getAllUsers,
  saveUser,
  getCurrentUser,
  setCurrentUser,
  hashPassword,
  loadUserScopedData,
  saveUserScopedData,
} from '../utils/authStorage';
import { formatDate } from '../utils/dateUtils';
import { triggerBloomConfetti, triggerCelebrationConfetti } from '../components/common/FlowerConfetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Auth state
  const [currentUser, setCurrentUserState] = useState(() => getCurrentUser());

  // User Profile state
  const [user, setUser] = useState(() => {
    const saved = loadFromStorage('user', INITIAL_USER);
    const active = getCurrentUser();
    if (active) {
      return { ...saved, name: active.name, avatar: active.avatar || '🌷', email: active.email };
    }
    return saved;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Active user's ID for data scoping
  const activeUserId = currentUser?.id || 'demo_kiran';

  // Productivity Entities scoped to current user
  const [tasks, setTasks] = useState(() => {
    const userStored = loadUserScopedData(activeUserId, 'tasks', null);
    if (userStored) return userStored;
    return loadFromStorage('tasks', INITIAL_TASKS);
  });

  const [subjects, setSubjects] = useState(() => {
    const userStored = loadUserScopedData(activeUserId, 'subjects', null);
    if (userStored) return userStored;
    return loadFromStorage('subjects', INITIAL_SUBJECTS);
  });

  const [studySessions, setStudySessions] = useState(() => {
    const userStored = loadUserScopedData(activeUserId, 'studySessions', null);
    if (userStored) return userStored;
    return loadFromStorage('studySessions', INITIAL_STUDY_SESSIONS);
  });

  const [habits, setHabits] = useState(() => {
    const userStored = loadUserScopedData(activeUserId, 'habits', null);
    if (userStored) return userStored;
    return loadFromStorage('habits', INITIAL_HABITS);
  });

  const [goals, setGoals] = useState(() => {
    const userStored = loadUserScopedData(activeUserId, 'goals', null);
    if (userStored) return userStored;
    return loadFromStorage('goals', INITIAL_GOALS);
  });

  const [notes, setNotes] = useState(() => {
    const userStored = loadUserScopedData(activeUserId, 'notes', null);
    if (userStored) return userStored;
    return loadFromStorage('notes', INITIAL_NOTES);
  });

  const [badges, setBadges] = useState(() => {
    const userStored = loadUserScopedData(activeUserId, 'badges', null);
    if (userStored) return userStored;
    return loadFromStorage('badges', BADGES_LIST);
  });

  // Modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isPlanDayModalOpen, setIsPlanDayModalOpen] = useState(false);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  const notify = (message, type = 'flower') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Switch workspace data when currentUser changes
  const switchUserData = (uId, uProfile) => {
    setUser((prev) => ({
      ...prev,
      name: uProfile.name,
      avatar: uProfile.avatar || '🌷',
      email: uProfile.email,
    }));

    setTasks(loadUserScopedData(uId, 'tasks', INITIAL_TASKS));
    setSubjects(loadUserScopedData(uId, 'subjects', INITIAL_SUBJECTS));
    setStudySessions(loadUserScopedData(uId, 'studySessions', INITIAL_STUDY_SESSIONS));
    setHabits(loadUserScopedData(uId, 'habits', INITIAL_HABITS));
    setGoals(loadUserScopedData(uId, 'goals', INITIAL_GOALS));
    setNotes(loadUserScopedData(uId, 'notes', INITIAL_NOTES));
    setBadges(loadUserScopedData(uId, 'badges', BADGES_LIST));
  };

  // Sync to User Scoped Storage
  useEffect(() => {
    saveUserScopedData(activeUserId, 'tasks', tasks);
    saveToStorage('tasks', tasks);
  }, [tasks, activeUserId]);

  useEffect(() => {
    saveUserScopedData(activeUserId, 'subjects', subjects);
    saveToStorage('subjects', subjects);
  }, [subjects, activeUserId]);

  useEffect(() => {
    saveUserScopedData(activeUserId, 'studySessions', studySessions);
    saveToStorage('studySessions', studySessions);
  }, [studySessions, activeUserId]);

  useEffect(() => {
    saveUserScopedData(activeUserId, 'habits', habits);
    saveToStorage('habits', habits);
  }, [habits, activeUserId]);

  useEffect(() => {
    saveUserScopedData(activeUserId, 'goals', goals);
    saveToStorage('goals', goals);
  }, [goals, activeUserId]);

  useEffect(() => {
    saveUserScopedData(activeUserId, 'notes', notes);
    saveToStorage('notes', notes);
  }, [notes, activeUserId]);

  useEffect(() => {
    saveUserScopedData(activeUserId, 'badges', badges);
    saveToStorage('badges', badges);
  }, [badges, activeUserId]);

  useEffect(() => {
    saveToStorage('user', user);
  }, [user]);

  // Sync Theme
  useEffect(() => {
    const root = document.documentElement;
    if (user.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [user.theme]);

  // Authentication Methods
  const login = (email, password) => {
    const users = getAllUsers();
    // Preload demo Kiran user if not present
    let targetUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!targetUser && email.toLowerCase() === 'kiran@daybloom.app') {
      targetUser = {
        id: 'usr_kiran',
        name: 'Kiran',
        email: 'kiran@daybloom.app',
        passwordHash: hashPassword(password),
        avatar: '🌷',
        createdAt: new Date().toISOString(),
      };
      saveUser(targetUser);
    }

    if (!targetUser) {
      return { success: false, message: 'No account found with this email. Please create one.' };
    }

    if (targetUser.passwordHash !== hashPassword(password)) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    setCurrentUser(targetUser);
    setCurrentUserState(targetUser);
    switchUserData(targetUser.id, targetUser);
    notify(`Welcome back, ${targetUser.name}! 🌸`, 'flower');
    return { success: true };
  };

  const signup = ({ name, email, password, avatar }) => {
    const users = getAllUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      passwordHash: hashPassword(password),
      avatar: avatar || '🌷',
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);

    // Initialize fresh starter tasks for this new user
    saveUserScopedData(newUser.id, 'tasks', INITIAL_TASKS);
    saveUserScopedData(newUser.id, 'subjects', INITIAL_SUBJECTS);
    saveUserScopedData(newUser.id, 'habits', INITIAL_HABITS);
    saveUserScopedData(newUser.id, 'goals', INITIAL_GOALS);
    saveUserScopedData(newUser.id, 'notes', INITIAL_NOTES);
    saveUserScopedData(newUser.id, 'badges', BADGES_LIST);

    setCurrentUser(newUser);
    setCurrentUserState(newUser);
    switchUserData(newUser.id, newUser);
    notify(`Account created! Welcome to DayBloom, ${name} 🌷`, 'flower');
    return { success: true };
  };

  const loginAsGuest = () => {
    const guestUser = {
      id: 'usr_guest',
      name: 'Mindful Guest',
      email: 'guest@daybloom.app',
      avatar: '🌿',
      isGuest: true,
    };
    setCurrentUser(guestUser);
    setCurrentUserState(guestUser);
    switchUserData(guestUser.id, guestUser);
    notify('Entered as Mindful Guest 🌿 Enjoy your study space!', 'flower');
  };

  const loginAsDemoKiran = () => {
    const kiranUser = {
      id: 'usr_kiran',
      name: 'Kiran',
      email: 'kiran@daybloom.app',
      avatar: '🌷',
    };
    saveUser({
      ...kiranUser,
      passwordHash: hashPassword('password123'),
      createdAt: new Date().toISOString(),
    });
    setCurrentUser(kiranUser);
    setCurrentUserState(kiranUser);
    switchUserData(kiranUser.id, kiranUser);
    notify('Logged in as Kiran with full demo garden 🌸', 'flower');
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentUserState(null);
    notify('You have been signed out gently. Rest well 🌙', 'info');
  };

  // Task Actions
  const addTask = (taskData) => {
    const newTask = {
      id: 'task-' + Date.now(),
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      category: taskData.category || 'Study',
      priority: taskData.priority || 'Medium',
      dueDate: taskData.dueDate || formatDate(),
      startTime: taskData.startTime || '',
      endTime: taskData.endTime || '',
      status: taskData.status || 'Pending',
      tags: taskData.tags || [],
      subtasks: taskData.subtasks || [],
      createdAt: new Date().toISOString(),
      completedAt: null,
      order: tasks.length,
    };
    setTasks((prev) => [newTask, ...prev]);
    notify('Task added to your garden 🌷', 'flower');
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const isNowCompleted = updates.status === 'Completed' && t.status !== 'Completed';
          if (isNowCompleted) {
            triggerBloomConfetti();
          }
          return {
            ...t,
            ...updates,
            completedAt: isNowCompleted ? new Date().toISOString() : updates.status ? null : t.completedAt,
          };
        }
        return t;
      })
    );
    notify('Task updated gently ✨', 'info');
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    notify('Task removed', 'info');
  };

  const duplicateTask = (id) => {
    const original = tasks.find((t) => t.id === id);
    if (!original) return;
    const duplicated = {
      ...original,
      id: 'task-' + Date.now(),
      title: `${original.title} (Copy)`,
      status: 'Pending',
      completedAt: null,
      createdAt: new Date().toISOString(),
      order: tasks.length,
    };
    setTasks((prev) => [duplicated, ...prev]);
    notify('Task duplicated 🌸', 'flower');
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const willComplete = t.status !== 'Completed';
          if (willComplete) {
            triggerBloomConfetti();
            notify('Splendid job completing that task! 🌷', 'flower');
          }
          return {
            ...t,
            status: willComplete ? 'Completed' : 'Pending',
            completedAt: willComplete ? new Date().toISOString() : null,
          };
        }
        return t;
      })
    );
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedSubtasks = (t.subtasks || []).map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          return { ...t, subtasks: updatedSubtasks };
        }
        return t;
      })
    );
  };

  const reorderTasks = (newTasks) => {
    setTasks(newTasks);
  };

  // Study Tracker Actions
  const addSubject = (subjectData) => {
    const newSub = {
      id: 'sub-' + Date.now(),
      name: subjectData.name.trim(),
      code: subjectData.code?.trim() || subjectData.name.substring(0, 4).toUpperCase(),
      color: subjectData.color || '#A855F7',
      targetHoursWeek: Number(subjectData.targetHoursWeek) || 5,
      totalMinutes: 0,
      topicsCount: Number(subjectData.topicsCount) || 0,
      practiceQuestions: Number(subjectData.practiceQuestions) || 0,
    };
    setSubjects((prev) => [...prev, newSub]);
    notify('New study subject planted 📚', 'flower');
  };

  const updateSubject = (id, updates) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    notify('Subject updated ✨', 'info');
  };

  const deleteSubject = (id) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    notify('Subject removed', 'info');
  };

  const logStudySession = (session) => {
    const newSession = {
      id: 'sess-' + Date.now(),
      date: session.date || formatDate(),
      subjectId: session.subjectId,
      durationMinutes: Number(session.durationMinutes) || 25,
      notes: session.notes?.trim() || '',
      completedTopics: session.completedTopics || [],
      questionsSolved: Number(session.questionsSolved) || 0,
    };

    setStudySessions((prev) => [newSession, ...prev]);

    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id === session.subjectId) {
          return {
            ...s,
            totalMinutes: s.totalMinutes + newSession.durationMinutes,
            topicsCount: s.topicsCount + newSession.completedTopics.length,
            practiceQuestions: s.practiceQuestions + newSession.questionsSolved,
          };
        }
        return s;
      })
    );

    triggerBloomConfetti();
    notify(`Logged ${newSession.durationMinutes}m of deep focus! 🌟`, 'flower');
  };

  // Habit Actions
  const addHabit = (habitData) => {
    const newHabit = {
      id: 'hab-' + Date.now(),
      name: habitData.name.trim(),
      icon: habitData.icon || 'Sparkles',
      color: habitData.color || '#A855F7',
      category: habitData.category || 'Mindfulness',
      streak: 0,
      bestStreak: 0,
      completedDates: {},
      archived: false,
    };
    setHabits((prev) => [...prev, newHabit]);
    notify('New habit seeded 🌱', 'flower');
  };

  const updateHabit = (id, updates) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, ...updates } : h)));
    notify('Habit updated ✨', 'info');
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    notify('Habit removed', 'info');
  };

  const toggleHabitDate = (habitId, dateStr = formatDate()) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const currentStatus = !!h.completedDates[dateStr];
          const newDates = { ...h.completedDates };
          if (currentStatus) {
            delete newDates[dateStr];
          } else {
            newDates[dateStr] = true;
            triggerBloomConfetti();
            notify(`Habit bloomed: ${h.name} 🌿`, 'flower');
          }

          let streak = 0;
          const checkDate = new Date();
          for (let i = 0; i < 365; i++) {
            const d = new Date(checkDate);
            d.setDate(checkDate.getDate() - i);
            const ds = formatDate(d);
            if (newDates[ds]) {
              streak++;
            } else if (i === 0) {
              continue;
            } else {
              break;
            }
          }

          return {
            ...h,
            completedDates: newDates,
            streak,
            bestStreak: Math.max(h.bestStreak || 0, streak),
          };
        }
        return h;
      })
    );
  };

  // Goals Actions
  const addGoal = (goalData) => {
    const newGoal = {
      id: 'goal-' + Date.now(),
      title: goalData.title.trim(),
      description: goalData.description?.trim() || '',
      category: goalData.category || 'General',
      type: goalData.type || 'short-term',
      targetDate: goalData.targetDate || '',
      progress: 0,
      notes: goalData.notes?.trim() || '',
      completed: false,
      milestones: goalData.milestones || [],
    };
    setGoals((prev) => [...prev, newGoal]);
    notify('New milestone planted 🎯', 'flower');
  };

  const updateGoal = (id, updates) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const updated = { ...g, ...updates };
          if (updated.milestones && updated.milestones.length > 0) {
            const completedCount = updated.milestones.filter((m) => m.completed).length;
            updated.progress = Math.round((completedCount / updated.milestones.length) * 100);
            updated.completed = updated.progress === 100;
          }
          return updated;
        }
        return g;
      })
    );
    notify('Goal progress saved ✨', 'info');
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    notify('Goal removed', 'info');
  };

  const toggleMilestone = (goalId, milestoneId) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const updatedMilestones = g.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          );
          const completedCount = updatedMilestones.filter((m) => m.completed).length;
          const progress = Math.round((completedCount / updatedMilestones.length) * 100);
          const isFinished = progress === 100;

          if (isFinished && !g.completed) {
            triggerCelebrationConfetti();
            notify(`🎉 Goal fully accomplished: "${g.title}"! Outstanding!`, 'flower');
          } else {
            triggerBloomConfetti();
          }

          return {
            ...g,
            milestones: updatedMilestones,
            progress,
            completed: isFinished,
          };
        }
        return g;
      })
    );
  };

  // Notes Actions
  const addNote = (noteData) => {
    const newNote = {
      id: 'note-' + Date.now(),
      title: noteData.title.trim(),
      content: noteData.content?.trim() || '',
      tags: noteData.tags || [],
      pinned: noteData.pinned || false,
      updatedAt: new Date().toISOString(),
      type: noteData.type || 'note',
      reflectionData: noteData.reflectionData || null,
    };
    setNotes((prev) => [newNote, ...prev]);
    notify('Note written gently in your journal 📝', 'flower');
  };

  const updateNote = (id, updates) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n))
    );
    notify('Note saved ✨', 'info');
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    notify('Note removed', 'info');
  };

  const togglePinNote = (id) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  // User Actions
  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
    if (currentUser) {
      const updatedAuthUser = { ...currentUser, ...updates };
      saveUser(updatedAuthUser);
      setCurrentUser(updatedAuthUser);
      setCurrentUserState(updatedAuthUser);
    }
    notify('Preferences updated 🌷', 'flower');
  };

  // Backup & Reset Actions
  const resetToDemoData = () => {
    setUser(INITIAL_USER);
    setTasks(INITIAL_TASKS);
    setSubjects(INITIAL_SUBJECTS);
    setStudySessions(INITIAL_STUDY_SESSIONS);
    setHabits(INITIAL_HABITS);
    setGoals(INITIAL_GOALS);
    setNotes(INITIAL_NOTES);
    setBadges(BADGES_LIST);
    notify('Restored aesthetic starter demo data 🌷', 'flower');
  };

  const clearToCleanWorkspace = () => {
    clearAllDayBloomData();
    setUser({
      ...INITIAL_USER,
      streak: 1,
      lastActiveDate: formatDate(),
    });
    setTasks([]);
    setSubjects([]);
    setStudySessions([]);
    setHabits([]);
    setGoals([]);
    setNotes([]);
    setBadges(BADGES_LIST.map((b) => ({ ...b, unlocked: false })));
    notify('Workspace refreshed to a clean blank canvas ✨', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        // Auth
        currentUser,
        login,
        signup,
        loginAsGuest,
        loginAsDemoKiran,
        logout,
        // User & Nav
        user,
        updateUser,
        activeTab,
        setActiveTab,
        isMobileNavOpen,
        setIsMobileNavOpen,
        searchQuery,
        setSearchQuery,
        // Tasks
        tasks,
        addTask,
        updateTask,
        deleteTask,
        duplicateTask,
        toggleTaskStatus,
        toggleSubtask,
        reorderTasks,
        isTaskModalOpen,
        setIsTaskModalOpen,
        editingTask,
        setEditingTask,
        isPlanDayModalOpen,
        setIsPlanDayModalOpen,
        // Study
        subjects,
        addSubject,
        updateSubject,
        deleteSubject,
        studySessions,
        logStudySession,
        // Habits
        habits,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleHabitDate,
        // Goals
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        toggleMilestone,
        // Notes
        notes,
        addNote,
        updateNote,
        deleteNote,
        togglePinNote,
        // Badges & Quotes
        badges,
        motivationalQuotes: MOTIVATIONAL_QUOTES,
        // Toasts
        toasts,
        notify,
        removeToast,
        // Persistence utils
        resetToDemoData,
        clearToCleanWorkspace,
        exportData: exportAllData,
        importData: importAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
