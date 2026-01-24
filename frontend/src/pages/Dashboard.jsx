import React, { useState, useEffect } from "react";
import { useExerciseCompletion } from "../context/ExerciseCompletionContext";
import { workoutService } from "../services/api";

const Dashboard = () => {
  const { recentActivity } = useExerciseCompletion();
  
  // State for current workout plan
  const [currentPlan, setCurrentPlan] = useState(null);
  
  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({});
  
  // Initialize attendance data
  useEffect(() => {
    // Load attendance data from localStorage or initialize empty
    const savedAttendance = localStorage.getItem('gymAttendance');
    if (savedAttendance) {
      setAttendanceData(JSON.parse(savedAttendance));
    }
  }, []);
  
  // Save attendance data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gymAttendance', JSON.stringify(attendanceData));
  }, [attendanceData]);
  
  // Fetch current workout plan
  useEffect(() => {
    const fetchCurrentPlan = async () => {
      try {
        const response = await workoutService.getCurrentPlan();
        if (response.success && response.data.plan) {
          setCurrentPlan(response.data.plan);
        }
      } catch (error) {
        console.error('Error fetching current plan:', error);
      }
    };
    
    fetchCurrentPlan();
  }, []);
  
  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };
  
  const isDateInPastOrToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date <= today;
  };
  
  const toggleAttendance = (date) => {
    if (!isDateInPastOrToday(date)) return;
    
    const dateKey = formatDateKey(date);
    setAttendanceData(prev => ({
      ...prev,
      [dateKey]: !prev[dateKey]
    }));
  };
  
  const isAttended = (date) => {
    const dateKey = formatDateKey(date);
    return !!attendanceData[dateKey];
  };
  
  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };
  
  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      days.push(date);
    }
    
    return days;
  };
  
  // Function to format time ago
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInSeconds = Math.floor((now - then) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  };

  // Function to calculate current streak
  const calculateStreak = () => {
    if (recentActivity.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = today;
    
    // Sort activities by timestamp descending (newest first)
    const sortedActivities = [...recentActivity].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    const activityDates = [...new Set(sortedActivities.map(activity => 
      new Date(activity.timestamp).toDateString()
    ))];
    
    // Check consecutive days
    while (true) {
      const dateString = currentDate.toDateString();
      if (activityDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };
  
  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Years for dropdown (last 5 years to next 5 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  
  // Handle month/year change from separate dropdowns
  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setCurrentDate(prev => new Date(prev.getFullYear(), newMonth - 1, 1));
  };
  
  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setCurrentDate(prev => new Date(newYear, prev.getMonth(), 1));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Welcome back! Ready to crush your goals today?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-dark-700 p-6 rounded-xl shadow border border-dark-600 hover:border-primary-500/30 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-primary-500/10 rounded-lg mr-4">
              <span className="text-primary-400 text-xl">💪</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Exercises Completed</p>
              <p className="text-2xl font-bold text-white">{recentActivity.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-700 p-6 rounded-xl shadow border border-dark-600 hover:border-secondary-500/30 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-secondary-500/10 rounded-lg mr-4">
              <span className="text-secondary-400 text-xl">🔥</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Current Streak</p>
              <p className="text-2xl font-bold text-white">{calculateStreak()} days</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-700 p-6 rounded-xl shadow border border-dark-600 hover:border-purple-500/30 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500/10 rounded-lg mr-4">
              <span className="text-purple-400 text-xl">⚡</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Calories Burned</p>
              <p className="text-2xl font-bold text-white">{Math.round(recentActivity.length * 85)}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-700 p-6 rounded-xl shadow border border-dark-600 hover:border-yellow-500/30 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-500/10 rounded-lg mr-4">
              <span className="text-yellow-400 text-xl">🎯</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Plan</p>
              <p className="text-2xl font-bold text-white">In Progress</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity - taking half of the width */}
        <div className="bg-dark-700 p-6 rounded-xl shadow border border-dark-600">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">📋</span> Recent Activity
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {/* Show recent exercise completions */}
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center p-3 bg-dark-600 rounded-lg border border-dark-500 hover:bg-dark-600/70 transition-colors duration-200">
                  <div className="p-2 bg-green-500/10 rounded mr-3">
                    <span className="text-green-400">✅</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{activity.message}</p>
                    <p className="text-xs text-gray-400">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                  <span className="text-green-400 text-sm font-medium">
                    +1 exercise
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="mb-2">No recent activity yet</p>
                <p className="text-sm">Complete exercises in your workout plan to see activity here</p>
              </div>
            )}
          </div>
        </div>

        {/* Proper Calendar - taking half of the width */}
        <div className="bg-dark-700 p-6 rounded-xl shadow border border-dark-600">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">📅</span> Workout Calendar
          </h2>
          
          {/* Calendar Header with Navigation */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <button 
                onClick={goToPreviousMonth}
                className="p-2 rounded-lg bg-dark-600 hover:bg-dark-500 transition-colors"
                aria-label="Previous month"
              >
                ←
              </button>
              
              <div className="flex items-center gap-2">
                <select 
                  value={currentDate.getMonth() + 1}
                  onChange={handleMonthChange}
                  className="p-2 rounded-lg bg-dark-600 text-white border border-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {monthNames.map((monthName, index) => (
                    <option key={index + 1} value={index + 1}>
                      {monthName}
                    </option>
                  ))}
                </select>
                
                <select 
                  value={currentDate.getFullYear()}
                  onChange={handleYearChange}
                  className="p-2 rounded-lg bg-dark-600 text-white border border-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              
              <button 
                onClick={goToNextMonth}
                className="p-2 rounded-lg bg-dark-600 hover:bg-dark-500 transition-colors"
                aria-label="Next month"
              >
                →
              </button>
            </div>
            
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-xs font-medium text-gray-400 py-1">
                  {day}
                </div>
              ))}
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="h-12"></div>;
              }
              
              const isPastOrToday = isDateInPastOrToday(date);
              const attended = isAttended(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => toggleAttendance(date)}
                  disabled={!isPastOrToday}
                  className={`
                    h-12 w-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                    ${attended 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : isToday
                        ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                        : isPastOrToday
                          ? 'text-gray-300 bg-dark-600 hover:bg-dark-500 border border-dark-500'
                          : 'text-gray-600 cursor-not-allowed'
                    }
                    ${!isPastOrToday ? 'opacity-50' : ''}
                  `}
                  aria-label={`${attended ? 'Mark as not attended' : 'Mark as attended'} for ${date.toLocaleDateString()}`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-dark-600">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Attended</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;