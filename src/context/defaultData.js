// Default aesthetic demo data for DayBloom
import { formatDate } from '../utils/dateUtils';

const today = formatDate();
const yesterdayDate = new Date();
yesterdayDate.setDate(yesterdayDate.getDate() - 1);
const yesterday = formatDate(yesterdayDate);

const twoDaysAgoDate = new Date();
twoDaysAgoDate.setDate(twoDaysAgoDate.getDate() - 2);
const twoDaysAgo = formatDate(twoDaysAgoDate);

const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const tomorrow = formatDate(tomorrowDate);

const threeDaysLaterDate = new Date();
threeDaysLaterDate.setDate(threeDaysLaterDate.getDate() + 3);
const threeDaysLater = formatDate(threeDaysLaterDate);

export const MOTIVATIONAL_QUOTES = [
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "Bloom with grace, grow with patience, and celebrate every quiet victory.", author: "Mindful Bloom" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "You don’t have to be extreme, just consistent.", author: "James Clear" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Study with calmness, code with clarity, live with purpose.", author: "DayBloom Wisdom" },
];

export const INITIAL_USER = {
  name: 'Kiran',
  avatar: '🌷',
  theme: 'light', // 'light' | 'dark' | 'lavender' | 'cream'
  startOfWeek: 'monday',
  dailyGoalHours: 4,
  dailyTasksTarget: 5,
  streak: 4,
  lastActiveDate: today,
  pomodoroSettings: {
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: false,
    soundEnabled: true,
  },
};

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Solve Binary Trees: Lowest Common Ancestor (DSA)',
    description: 'Review recursion approach, draw trees on iPad, and submit on LeetCode.',
    category: 'Study',
    priority: 'High',
    dueDate: today,
    startTime: '09:00',
    endTime: '10:30',
    status: 'Completed',
    tags: ['#dsa', '#leetcode', '#trees'],
    subtasks: [
      { id: 'st-1', title: 'Trace recursive base case', completed: true },
      { id: 'st-2', title: 'Write clean C++ code', completed: true },
      { id: 'st-3', title: 'Dry-run edge cases (null roots)', completed: true },
    ],
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    order: 0,
  },
  {
    id: 'task-2',
    title: 'DBMS Normalization & BCNF Practice',
    description: 'Work through 1NF to BCNF decomposition questions for upcoming semester exam.',
    category: 'Study',
    priority: 'High',
    dueDate: today,
    startTime: '11:00',
    endTime: '12:30',
    status: 'In Progress',
    tags: ['#dbms', '#semester', '#notes'],
    subtasks: [
      { id: 'st-4', title: 'Functional dependency proofs', completed: true },
      { id: 'st-5', title: 'Practice 4 BCNF decomposition problems', completed: false },
    ],
    createdAt: new Date().toISOString(),
    completedAt: null,
    order: 1,
  },
  {
    id: 'task-3',
    title: 'Build DayBloom Responsive Habit Heatmap Component',
    description: 'Implement Github-style 90-day interactive consistency grid using SVG & Tailwind.',
    category: 'Project',
    priority: 'High',
    dueDate: today,
    startTime: '14:00',
    endTime: '16:00',
    status: 'In Progress',
    tags: ['#react', '#portfolio', '#frontend'],
    subtasks: [
      { id: 'st-6', title: 'Compute day cell streaks', completed: true },
      { id: 'st-7', title: 'Add tooltip on hover', completed: false },
    ],
    createdAt: new Date().toISOString(),
    completedAt: null,
    order: 2,
  },
  {
    id: 'task-4',
    title: 'Afternoon Mindful Tea & 15m Walk in the Garden',
    description: 'Step away from all screens, breathe deeply, and re-center.',
    category: 'Health',
    priority: 'Medium',
    dueDate: today,
    startTime: '16:30',
    endTime: '17:00',
    status: 'Pending',
    tags: ['#wellness', '#rest'],
    subtasks: [],
    createdAt: new Date().toISOString(),
    completedAt: null,
    order: 3,
  },
  {
    id: 'task-5',
    title: 'Aptitude: Speed Math & Percentages Drills',
    description: '20 questions timed test for placement prep.',
    category: 'Study',
    priority: 'Medium',
    dueDate: today,
    startTime: '17:30',
    endTime: '18:30',
    status: 'Pending',
    tags: ['#aptitude', '#placements'],
    subtasks: [
      { id: 'st-8', title: 'Fraction to decimal conversions', completed: false },
      { id: 'st-9', title: 'Solve 15 profit/loss sums', completed: false },
    ],
    createdAt: new Date().toISOString(),
    completedAt: null,
    order: 4,
  },
  {
    id: 'task-6',
    title: 'Review Communication Skills & Mock HR Interview Notes',
    description: 'Prepare behavioral STAR stories for tech internships.',
    category: 'Study',
    priority: 'Low',
    dueDate: tomorrow,
    startTime: '10:00',
    endTime: '11:00',
    status: 'Pending',
    tags: ['#interview', '#speaking'],
    subtasks: [],
    createdAt: new Date().toISOString(),
    completedAt: null,
    order: 5,
  },
  {
    id: 'task-7',
    title: 'Read 2 Chapters of "Atomic Habits"',
    description: 'Make notes on the four laws of behavior change in the Journal.',
    category: 'Reading',
    priority: 'Low',
    dueDate: threeDaysLater,
    startTime: '21:00',
    endTime: '21:45',
    status: 'Pending',
    tags: ['#reading', '#growth'],
    subtasks: [],
    createdAt: new Date().toISOString(),
    completedAt: null,
    order: 6,
  },
  {
    id: 'task-8',
    title: 'Update GitHub Portfolio & README',
    description: 'Document architecture diagrams and live deployment links.',
    category: 'Project',
    priority: 'Medium',
    dueDate: yesterday, // deliberately overdue to demonstrate overdue indicator!
    startTime: '18:00',
    endTime: '19:00',
    status: 'Pending',
    tags: ['#github', '#showcase'],
    subtasks: [],
    createdAt: new Date().toISOString(),
    completedAt: null,
    order: 7,
  }
];

export const INITIAL_SUBJECTS = [
  {
    id: 'sub-dsa',
    name: 'Data Structures & Algorithms',
    code: 'DSA',
    color: '#A855F7', // lavender/purple
    bgLight: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: 'Code2',
    targetHoursWeek: 12,
    totalMinutes: 510,
    topicsCount: 18,
    practiceQuestions: 64,
  },
  {
    id: 'sub-webdev',
    name: 'Web Development & System Design',
    code: 'WebDev',
    color: '#EC4899', // blush pink
    bgLight: 'bg-pink-50 text-pink-700 border-pink-200',
    icon: 'Layout',
    targetHoursWeek: 10,
    totalMinutes: 440,
    topicsCount: 12,
    practiceQuestions: 35,
  },
  {
    id: 'sub-dbms',
    name: 'Database Management Systems',
    code: 'DBMS',
    color: '#8B5CF6', // violet
    bgLight: 'bg-violet-50 text-violet-700 border-violet-200',
    icon: 'Database',
    targetHoursWeek: 6,
    totalMinutes: 260,
    topicsCount: 9,
    practiceQuestions: 28,
  },
  {
    id: 'sub-aptitude',
    name: 'Quantitative Aptitude & Logic',
    code: 'Aptitude',
    color: '#F97316', // peach/orange
    bgLight: 'bg-orange-50 text-orange-700 border-orange-200',
    icon: 'BrainCircuit',
    targetHoursWeek: 5,
    totalMinutes: 210,
    topicsCount: 8,
    practiceQuestions: 75,
  },
  {
    id: 'sub-comm',
    name: 'Professional Communication',
    code: 'Communication',
    color: '#14B8A6', // teal/sage
    bgLight: 'bg-teal-50 text-teal-700 border-teal-200',
    icon: 'MessageSquareText',
    targetHoursWeek: 3,
    totalMinutes: 130,
    topicsCount: 6,
    practiceQuestions: 15,
  },
];

export const INITIAL_STUDY_SESSIONS = [
  {
    id: 'sess-1',
    subjectId: 'sub-dsa',
    durationMinutes: 75,
    date: today,
    notes: 'Mastered Binary Tree LCA and level-order traversal variations.',
    completedTopics: ['Binary Trees LCA', 'BFS Queue implementation'],
    questionsSolved: 4,
  },
  {
    id: 'sess-2',
    subjectId: 'sub-webdev',
    durationMinutes: 90,
    date: today,
    notes: 'Built React context and animated modal transitions.',
    completedTopics: ['Context API Architecture', 'CSS Transitions'],
    questionsSolved: 0,
  },
  {
    id: 'sess-3',
    subjectId: 'sub-dbms',
    durationMinutes: 60,
    date: yesterday,
    notes: 'Solved 3NF and BCNF normalization questions.',
    completedTopics: ['BCNF Decomposition', 'Lossless Joins'],
    questionsSolved: 6,
  },
  {
    id: 'sess-4',
    subjectId: 'sub-aptitude',
    durationMinutes: 45,
    date: yesterday,
    notes: 'Time and Distance shortcuts & relative speed concepts.',
    completedTopics: ['Trains & Platforms', 'Circular Tracks'],
    questionsSolved: 18,
  },
  {
    id: 'sess-5',
    subjectId: 'sub-dsa',
    durationMinutes: 90,
    date: twoDaysAgo,
    notes: 'Dynamic programming memoization on knapsack variants.',
    completedTopics: ['0/1 Knapsack', 'Subset Sum Problem'],
    questionsSolved: 5,
  },
];

export const INITIAL_HABITS = [
  {
    id: 'hab-1',
    name: 'Morning Meditation (10m)',
    icon: 'Sparkles',
    color: '#A855F7',
    category: 'Mindfulness',
    streak: 6,
    bestStreak: 14,
    completedDates: {
      [today]: true,
      [yesterday]: true,
      [twoDaysAgo]: true,
    },
    archived: false,
  },
  {
    id: 'hab-2',
    name: 'Drink 2.5 Liters of Water',
    icon: 'Droplets',
    color: '#3B82F6',
    category: 'Health',
    streak: 8,
    bestStreak: 21,
    completedDates: {
      [today]: true,
      [yesterday]: true,
      [twoDaysAgo]: true,
    },
    archived: false,
  },
  {
    id: 'hab-3',
    name: 'Practice Coding (DSA/Dev)',
    icon: 'Terminal',
    color: '#EC4899',
    category: 'Growth',
    streak: 12,
    bestStreak: 18,
    completedDates: {
      [today]: true,
      [yesterday]: true,
      [twoDaysAgo]: true,
    },
    archived: false,
  },
  {
    id: 'hab-4',
    name: 'Workout or Evening Jog',
    icon: 'Activity',
    color: '#10B981',
    category: 'Health',
    streak: 3,
    bestStreak: 9,
    completedDates: {
      [yesterday]: true,
      [twoDaysAgo]: true,
    },
    archived: false,
  },
  {
    id: 'hab-5',
    name: 'Read 15 Pages of a Book',
    icon: 'BookOpen',
    color: '#F59E0B',
    category: 'Learning',
    streak: 5,
    bestStreak: 10,
    completedDates: {
      [yesterday]: true,
      [twoDaysAgo]: true,
    },
    archived: false,
  },
  {
    id: 'hab-6',
    name: 'Journal & Daily Reflection',
    icon: 'Feather',
    color: '#8B5CF6',
    category: 'Mindfulness',
    streak: 4,
    bestStreak: 12,
    completedDates: {
      [yesterday]: true,
      [twoDaysAgo]: true,
    },
    archived: false,
  },
  {
    id: 'hab-7',
    name: 'Sleep by 11:30 PM',
    icon: 'Moon',
    color: '#6366F1',
    category: 'Rest',
    streak: 2,
    bestStreak: 7,
    completedDates: {
      [twoDaysAgo]: true,
    },
    archived: false,
  },
];

export const INITIAL_GOALS = [
  {
    id: 'goal-1',
    title: 'Crush the Software Engineering Campus Placement',
    description: 'Solve 200+ DSA problems, build 2 stellar full-stack projects, and master core CS subjects.',
    category: 'Career',
    type: 'long-term',
    targetDate: '2026-12-15',
    progress: 65,
    notes: 'Focusing heavily on graph algorithms and system design basics this month.',
    completed: false,
    milestones: [
      { id: 'm-1', title: 'Complete Striver SDE Sheet Arrays & Strings', completed: true },
      { id: 'm-2', title: 'Complete Trees and Graphs topics', completed: true },
      { id: 'm-3', title: 'Deploy DayBloom Web App live on Vercel', completed: true },
      { id: 'm-4', title: 'Revise OS and DBMS with handwritten notes', completed: false },
      { id: 'm-5', title: 'Participate in 5 LeetCode Biweekly Contests', completed: false },
    ],
  },
  {
    id: 'goal-2',
    title: 'Build a Habit of Consistent 4-Hour Daily Deep Work',
    description: 'Establish focused uninterrupted study slots without phone notifications.',
    category: 'Productivity',
    type: 'short-term',
    targetDate: '2026-10-31',
    progress: 75,
    notes: 'Pomodoro timer has improved my attention span significantly.',
    completed: false,
    milestones: [
      { id: 'm-6', title: 'Complete 7 days with 4+ hours logged', completed: true },
      { id: 'm-7', title: 'Reach a 14-day study streak', completed: false },
      { id: 'm-8', title: 'Reflect weekly in the DayBloom Journal', completed: true },
    ],
  },
  {
    id: 'goal-3',
    title: 'Finish Reading "Designing Data-Intensive Applications"',
    description: 'Gain a solid foundation in distributed databases, replication, and partitioning.',
    category: 'Learning',
    type: 'long-term',
    targetDate: '2026-11-20',
    progress: 40,
    notes: 'Chapters 5 and 6 on leader-based replication were eye-opening.',
    completed: false,
    milestones: [
      { id: 'm-9', title: 'Read Part 1: Foundations of Data Systems', completed: true },
      { id: 'm-10', title: 'Read Part 2: Distributed Data', completed: false },
      { id: 'm-11', title: 'Read Part 3: Derived Data', completed: false },
    ],
  },
];

export const INITIAL_NOTES = [
  {
    id: 'note-1',
    title: '🌸 Daily Reflection — Staying Resilient',
    content: `Today felt calm and productive. Tackling the binary tree problems in the morning gave me high momentum for the rest of the day.

**Achievements:**
• Solved 4 LeetCode medium questions without looking at solutions
• Completed my 2.5L water intake habit
• Balanced screen time with a garden walk

**Gratitude:**
Grateful for good coffee, supportive friends who solve coding challenges together, and a quiet desk setup.`,
    tags: ['#reflection', '#gratitude', '#daily'],
    pinned: true,
    updatedAt: new Date().toISOString(),
    type: 'reflection',
  },
  {
    id: 'note-2',
    title: '💡 Quick Cheatsheet: SQL Normalization Rules',
    content: `**1NF:** Atomic values only, no repeating groups.
**2NF:** Must be in 1NF + No partial dependencies (every non-prime attribute fully dependent on primary key).
**3NF:** Must be in 2NF + No transitive dependencies ($X \\rightarrow Y$ where $Y$ is not prime and $X$ is not superkey).
**BCNF:** For every functional dependency $X \\rightarrow Y$, $X$ must be a superkey!`,
    tags: ['#dbms', '#cheatsheet', '#study'],
    pinned: true,
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    type: 'note',
  },
  {
    id: 'note-3',
    title: '🚀 DayBloom Feature Roadmap & Design Principles',
    content: `Keep the palette pastel, gentle, and calming. Never overwhelm the student with harsh red alerts. Use soft coral and rose instead. Celebrate every small win with delicate flower confetti!`,
    tags: ['#design', '#ideas'],
    pinned: false,
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    type: 'note',
  },
];

export const BADGES_LIST = [
  {
    id: 'badge-first-bloom',
    title: 'First Bloom',
    description: 'Completed your very first task in DayBloom.',
    icon: 'Sprout',
    color: '#10B981',
    unlocked: true,
    unlockedAt: '2026-09-28',
  },
  {
    id: 'badge-streak-3',
    title: 'Seedling Streak',
    description: 'Maintained a 3-day active consistency streak.',
    icon: 'Flame',
    color: '#F59E0B',
    unlocked: true,
    unlockedAt: '2026-09-30',
  },
  {
    id: 'badge-focus-master',
    title: 'Focus Master',
    description: 'Logged over 10 hours of focused study sessions.',
    icon: 'Hourglass',
    color: '#A855F7',
    unlocked: true,
    unlockedAt: '2026-10-01',
  },
  {
    id: 'badge-habit-builder',
    title: 'Habit Artisan',
    description: 'Checked off 50 habit entries in your personal journey.',
    icon: 'HeartHandshake',
    color: '#EC4899',
    unlocked: true,
    unlockedAt: '2026-10-02',
  },
  {
    id: 'badge-century-club',
    title: 'Century Club',
    description: 'Solve 100+ practice questions across all subjects.',
    icon: 'Award',
    color: '#8B5CF6',
    unlocked: false,
    progress: 75,
  },
  {
    id: 'badge-goal-crusher',
    title: 'Summit Reacher',
    description: 'Complete 100% of milestones in any major goal.',
    icon: 'Trophy',
    color: '#EAB308',
    unlocked: false,
    progress: 65,
  },
  {
    id: 'badge-reflection-star',
    title: 'Mindful Scribe',
    description: 'Record 7 thoughtful journal reflections.',
    icon: 'BookMarked',
    color: '#06B6D4',
    unlocked: false,
    progress: 42,
  },
];
