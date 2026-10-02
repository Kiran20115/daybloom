import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { MobileNav } from './components/common/MobileNav';
import { ToastContainer } from './components/common/ToastContainer';
import { TaskModal } from './components/tasks/TaskModal';
import { PlanMyDayModal } from './components/planner/PlanMyDayModal';

// Views
import { DashboardView } from './components/dashboard/DashboardView';
import { TasksView } from './components/tasks/TasksView';
import { DailyPlannerView } from './components/planner/DailyPlannerView';
import { StudyTrackerView } from './components/study/StudyTrackerView';
import { HabitTrackerView } from './components/habits/HabitTrackerView';
import { GoalsView } from './components/goals/GoalsView';
import { CalendarView } from './components/calendar/CalendarView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { NotesView } from './components/notes/NotesView';
import { RewardsView } from './components/rewards/RewardsView';
import { SettingsView } from './components/settings/SettingsView';

const MainContent = () => {
  const {
    activeTab,
    isTaskModalOpen,
    setIsTaskModalOpen,
    editingTask,
    isPlanDayModalOpen,
    setIsPlanDayModalOpen,
  } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'tasks':
        return <TasksView />;
      case 'planner':
        return <DailyPlannerView />;
      case 'study':
        return <StudyTrackerView />;
      case 'habits':
        return <HabitTrackerView />;
      case 'goals':
        return <GoalsView />;
      case 'calendar':
        return <CalendarView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'notes':
        return <NotesView />;
      case 'rewards':
        return <RewardsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] dark:bg-[#0C0A14] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-10">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Global Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        taskToEdit={editingTask}
      />

      {/* Plan My Day Modal */}
      <PlanMyDayModal
        isOpen={isPlanDayModalOpen}
        onClose={() => setIsPlanDayModalOpen(false)}
      />

      {/* Aesthetic Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
