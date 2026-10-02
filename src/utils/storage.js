// LocalStorage abstraction layer for DayBloom

const STORAGE_PREFIX = 'daybloom_v1_';

export const loadFromStorage = (key, fallbackValue) => {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    if (!item) return fallbackValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error loading ${key} from storage:`, error);
    return fallbackValue;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
};

export const exportAllData = () => {
  try {
    const allData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX)) {
        const cleanKey = k.replace(STORAGE_PREFIX, '');
        allData[cleanKey] = JSON.parse(localStorage.getItem(k));
      }
    }
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DayBloom_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error('Export failed', err);
    return false;
  }
};

export const importAllData = (jsonData) => {
  try {
    const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    Object.keys(parsed).forEach((k) => {
      localStorage.setItem(STORAGE_PREFIX + k, JSON.stringify(parsed[k]));
    });
    return true;
  } catch (err) {
    console.error('Import failed', err);
    return false;
  }
};

export const clearAllDayBloomData = () => {
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    return true;
  } catch (err) {
    console.error('Clear failed', err);
    return false;
  }
};
