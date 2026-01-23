import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { workoutService } from "../services/api";

const WorkoutTracker = () => {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeExercise, setActiveExercise] = useState(0);
  const [setsCompleted, setSetsCompleted] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);

  useEffect(() => {
    const loadWorkout = async () => {
      try {
        // If we have a workoutId, load specific workout
        // Otherwise, get today's workout from current plan
        if (workoutId) {
          // Load specific workout (would need backend endpoint)
          console.log("Loading specific workout:", workoutId);
        } else {
          // Get today's workout from current plan
          const response = await workoutService.getCurrentPlan();
          if (response.success && response.data.plan?.workouts?.length > 0) {
            const todayWorkout = response.data.plan.workouts[0];
            setCurrentWorkout({
              id: todayWorkout.id,
              name: todayWorkout.name,
              description: todayWorkout.description,
              exercises: todayWorkout.exercise_details?.exercises || [],
              muscleGroups: todayWorkout.exercise_details?.muscleGroups || [],
              duration: todayWorkout.estimated_duration_minutes || 45,
              sets: todayWorkout.exercise_details?.sets || 3,
              reps: todayWorkout.exercise_details?.reps || "8-12",
              rest: todayWorkout.exercise_details?.rest || "60-90 seconds"
            });
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading workout:", error);
        setLoading(false);
      }
    };

    loadWorkout();
  }, [workoutId]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startWorkout = () => {
    setWorkoutStarted(true);
    setIsTimerRunning(true);
    // Initialize sets tracking
    const initialSets = currentWorkout.exercises.map(() => 
      Array(currentWorkout.sets).fill({ completed: false, weight: '', reps: '' })
    );
    setSetsCompleted(initialSets);
  };

  const completeSet = (exerciseIndex, setIndex, weight, reps) => {
    const newSets = [...setsCompleted];
    newSets[exerciseIndex][setIndex] = {
      completed: true,
      weight,
      reps,
      timestamp: new Date().toISOString()
    };
    setSetsCompleted(newSets);
  };

  const skipRestTimer = () => {
    setTimer(0);
  };

  const finishWorkout = () => {
    setIsTimerRunning(false);
    // Save workout data to backend
    console.log("Workout completed:", {
      workoutId: currentWorkout.id,
      duration: timer,
      exercises: setsCompleted
    });
    // Navigate back to workout plan or dashboard
    navigate("/workout-plan");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading workout...</p>
        </div>
      </div>
    );
  }

  if (!currentWorkout) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-white mb-2">No Workout Available</h2>
        <p className="text-gray-400">No workout scheduled for today.</p>
        <button 
          onClick={() => navigate("/workout-plan")}
          className="mt-4 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg"
        >
          Generate New Plan
        </button>
      </div>
    );
  }

  const currentExercise = currentWorkout.exercises[activeExercise];
  const exerciseSets = setsCompleted[activeExercise] || [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-dark-700 rounded-lg p-6 mb-6 border border-dark-600">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{currentWorkout.name}</h1>
            <p className="text-gray-400 mt-1">{currentWorkout.description}</p>
            {currentWorkout.muscleGroups && (
              <p className="text-sm text-gray-500 mt-2">
                Target Muscles: {currentWorkout.muscleGroups.join(", ")}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-mono text-primary-400">{formatTime(timer)}</div>
            <p className="text-sm text-gray-400">Workout Time</p>
          </div>
        </div>
        
        {!workoutStarted ? (
          <button
            onClick={startWorkout}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
          >
            Start Workout
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={finishWorkout}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Finish Workout
            </button>
          </div>
        )}
      </div>

      {workoutStarted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Exercise Progress */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-dark-700 rounded-lg p-6 border border-dark-600">
              <h2 className="text-xl font-semibold text-white mb-4">
                {currentExercise} - Set {exerciseSets.filter(s => s.completed).length + 1} of {currentWorkout.sets}
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-dark-600 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Target Reps</p>
                  <p className="text-lg font-semibold text-white">{currentWorkout.reps}</p>
                </div>
                <div className="bg-dark-600 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Rest Period</p>
                  <p className="text-lg font-semibold text-white">{currentWorkout.rest}</p>
                </div>
              </div>

              {/* Set Tracking Form */}
              <div className="bg-dark-600 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-white mb-3">Complete Set</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Weight (lbs/kg)</label>
                    <input
                      type="number"
                      placeholder="Enter weight"
                      className="w-full p-2 bg-dark-700 border border-dark-500 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Reps Completed</label>
                    <input
                      type="number"
                      placeholder="Enter reps"
                      className="w-full p-2 bg-dark-700 border border-dark-500 rounded text-white"
                    />
                  </div>
                </div>
                <button className="w-full mt-3 bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg">
                  Mark Set Complete
                </button>
              </div>

              {/* Rest Timer */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="font-medium text-purple-400 mb-2">Rest Timer</h3>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-mono text-purple-400">{formatTime(timer % 90)}</div>
                  <button 
                    onClick={skipRestTimer}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Skip Rest
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Workout Overview */}
          <div className="space-y-4">
            {/* Exercise List */}
            <div className="bg-dark-700 rounded-lg p-6 border border-dark-600">
              <h3 className="font-semibold text-white mb-4">Exercise Progress</h3>
              <div className="space-y-3">
                {currentWorkout.exercises.map((exercise, index) => {
                  const completedSets = setsCompleted[index]?.filter(s => s.completed).length || 0;
                  const isCurrent = index === activeExercise;
                  
                  return (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border ${
                        isCurrent 
                          ? 'bg-primary-500/20 border-primary-500' 
                          : completedSets === currentWorkout.sets
                            ? 'bg-green-500/20 border-green-500'
                            : 'bg-dark-600 border-dark-500'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${
                          isCurrent ? 'text-white' : 
                          completedSets === currentWorkout.sets ? 'text-green-400' : 'text-gray-300'
                        }`}>
                          {exercise}
                        </span>
                        <span className="text-sm text-gray-400">
                          {completedSets}/{currentWorkout.sets}
                        </span>
                      </div>
                      {isCurrent && (
                        <div className="mt-2 w-full bg-dark-600 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${(completedSets / currentWorkout.sets) * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-dark-700 rounded-lg p-6 border border-dark-600">
              <h3 className="font-semibold text-white mb-4">Workout Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Exercises</span>
                  <span className="text-white">{currentWorkout.exercises.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Sets</span>
                  <span className="text-white">{currentWorkout.exercises.length * currentWorkout.sets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Completed</span>
                  <span className="text-green-400">
                    {setsCompleted.flat().filter(s => s.completed).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Remaining</span>
                  <span className="text-yellow-400">
                    {currentWorkout.exercises.length * currentWorkout.sets - setsCompleted.flat().filter(s => s.completed).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutTracker;