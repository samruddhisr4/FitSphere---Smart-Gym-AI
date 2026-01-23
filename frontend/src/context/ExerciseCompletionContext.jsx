import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context for exercise completion tracking
const ExerciseCompletionContext = createContext();

// Provider component
export const ExerciseCompletionProvider = ({ children }) => {
  const [completedExercises, setCompletedExercises] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCompleted = localStorage.getItem('completedExercises');
    const savedActivity = localStorage.getItem('recentActivity');
    
    if (savedCompleted) {
      setCompletedExercises(JSON.parse(savedCompleted));
    }
    
    if (savedActivity) {
      setRecentActivity(JSON.parse(savedActivity));
    }
  }, []);

  // Save to localStorage whenever completedExercises changes
  useEffect(() => {
    localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
  }, [completedExercises]);

  // Save to localStorage whenever recentActivity changes
  useEffect(() => {
    localStorage.setItem('recentActivity', JSON.stringify(recentActivity));
  }, [recentActivity]);

  // Function to toggle exercise completion
  const toggleExerciseCompletion = (dayIndex, exerciseIndex, exerciseName, dayName) => {
    const key = `${dayIndex}-${exerciseIndex}`;
    const isCurrentlyCompleted = completedExercises[key] || false;
    
    setCompletedExercises(prev => ({
      ...prev,
      [key]: !isCurrentlyCompleted
    }));

    // Add to recent activity if marking as completed
    if (!isCurrentlyCompleted) {
      const newActivity = {
        id: Date.now(),
        type: 'exercise_completed',
        exerciseName,
        dayName,
        timestamp: new Date().toISOString(),
        message: `Completed ${exerciseName} on ${dayName}`
      };
      
      setRecentActivity(prev => [newActivity, ...prev.slice(0, 9)]); // Keep last 10 activities
    }
  };

  // Function to get completion status
  const isExerciseCompleted = (dayIndex, exerciseIndex) => {
    const key = `${dayIndex}-${exerciseIndex}`;
    return completedExercises[key] || false;
  };

  // Function to calculate overall progress
  const calculateOverallProgress = (weeklySchedule) => {
    if (!weeklySchedule) return { completed: 0, total: 0, percentage: 0 };
    
    let totalExercises = 0;
    let completedCount = 0;
    
    weeklySchedule.forEach((day, dayIndex) => {
      if (day.exercises && day.type !== 'rest') {
        totalExercises += day.exercises.length;
        day.exercises.forEach((_, exIndex) => {
          const key = `${dayIndex}-${exIndex}`;
          if (completedExercises[key]) completedCount++;
        });
      }
    });
    
    return {
      completed: completedCount,
      total: totalExercises,
      percentage: totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0,
      remaining: totalExercises - completedCount
    };
  };

  // Function to reset progress (when generating new plan)
  const resetProgress = () => {
    setCompletedExercises({});
  };

  const value = {
    completedExercises,
    recentActivity,
    toggleExerciseCompletion,
    isExerciseCompleted,
    calculateOverallProgress,
    resetProgress
  };

  return (
    <ExerciseCompletionContext.Provider value={value}>
      {children}
    </ExerciseCompletionContext.Provider>
  );
};

// Custom hook to use the context
export const useExerciseCompletion = () => {
  const context = useContext(ExerciseCompletionContext);
  if (!context) {
    throw new Error('useExerciseCompletion must be used within an ExerciseCompletionProvider');
  }
  return context;
};

export default ExerciseCompletionContext;