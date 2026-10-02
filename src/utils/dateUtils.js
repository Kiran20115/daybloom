// Date and time helper utilities for DayBloom

export const formatDate = (date = new Date()) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const formatFullDate = (date = new Date()) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getTimeGreeting = (name = 'Friend') => {
  const hour = new Date().getHours();
  if (hour < 5) return { greeting: `Rest easy, ${name}`, emoji: '🌙', subtext: 'Night hours are for peace and rejuvenation.' };
  if (hour < 12) return { greeting: `Good morning, ${name}!`, emoji: '🌷', subtext: 'Ready to bloom today? A gentle step at a time.' };
  if (hour < 17) return { greeting: `Good afternoon, ${name}!`, emoji: '✨', subtext: 'Keep that wonderful momentum flowing.' };
  if (hour < 21) return { greeting: `Good evening, ${name}!`, emoji: '🌸', subtext: 'Reflect on what you achieved today with gratitude.' };
  return { greeting: `Good night, ${name}!`, emoji: '💫', subtext: 'You did your best today. Unwind and breathe.' };
};

export const isToday = (dateStr) => {
  return dateStr === formatDate();
};

export const isPastDue = (dateStr, status) => {
  if (!dateStr || status === 'Completed') return false;
  return dateStr < formatDate();
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDayOfWeekIndex = (year, month, day, startOnSunday = false) => {
  const dayIdx = new Date(year, month, day).getDay();
  if (startOnSunday) return dayIdx;
  return dayIdx === 0 ? 6 : dayIdx - 1; // 0 = Mon, 6 = Sun
};

export const getPastNDays = (n = 7) => {
  const result = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    result.push(formatDate(d));
  }
  return result;
};

export const getPastMonthHeatmapDays = (totalDays = 90) => {
  const days = [];
  const today = new Date();
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    days.push(formatDate(d));
  }
  return days;
};

export const formatMinutesToHours = (minutes = 0) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins}m`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}m`;
};
