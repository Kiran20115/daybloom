// Authentication and multi-user storage manager for DayBloom

const USERS_KEY = 'daybloom_auth_users_v1';
const CURRENT_USER_KEY = 'daybloom_current_user_v1';

// Simple client-side hash simulation (hashing string for demo security)
export const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return 'db_hash_' + Math.abs(hash).toString(36);
};

export const getAllUsers = () => {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading users from storage', e);
    return [];
  }
};

export const saveUser = (user) => {
  try {
    const users = getAllUsers();
    const existingIndex = users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...user };
    } else {
      users.push(user);
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving user to storage', e);
  }
};

export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const setCurrentUser = (user) => {
  try {
    if (!user) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Error updating current user', e);
  }
};

// User-scoped LocalStorage keys
export const getUserScopedKey = (userId, key) => {
  return `daybloom_u_${userId}_${key}`;
};

export const loadUserScopedData = (userId, key, fallback) => {
  try {
    const raw = localStorage.getItem(getUserScopedKey(userId, key));
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
};

export const saveUserScopedData = (userId, key, value) => {
  try {
    localStorage.setItem(getUserScopedKey(userId, key), JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving user data for ${key}`, e);
  }
};
