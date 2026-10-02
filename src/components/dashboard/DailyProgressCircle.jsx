import React from 'react';

export const DailyProgressCircle = ({ completed = 0, total = 0, size = 160 }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-purple-100 dark:text-purple-950/60 fill-none"
          />
          {/* Animated gradient progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#bloomGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out fill-none"
          />
          <defs>
            <linearGradient id="bloomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="50%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#FB7185" />
            </linearGradient>
          </defs>
        </svg>

        {/* Inner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
            {percentage}%
          </span>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            {completed}/{total} Completed
          </span>
        </div>
      </div>

      <p className="text-xs text-center font-medium text-purple-700 dark:text-purple-300 mt-3">
        {percentage === 100 && total > 0
          ? '🎉 All flowers in full bloom today!'
          : percentage >= 50
          ? '🌸 Wonderful progress! Keep blooming.'
          : total > 0
          ? '🌱 Gentle seeds planted. Take it one step at a time.'
          : '🌷 Add tasks to begin blooming today.'}
      </p>
    </div>
  );
};
