import React, { useState, useEffect } from "react";
import { workoutService } from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaRegCircle, FaPlayCircle, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { getExerciseVideoUrl, getEmbeddedVideoUrl } from "../services/exerciseVideos";
import { useExerciseCompletion } from "../context/ExerciseCompletionContext";

const WorkoutPlan = () => {
  const navigate = useNavigate();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [intensity, setIntensity] = useState("beginner");
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [focusArea, setFocusArea] = useState("strength");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const { completedExercises, toggleExerciseCompletion: contextToggleExerciseCompletion, calculateOverallProgress, resetProgress } = useExerciseCompletion();
  
  // Calculate progress using context
  const progress = workoutPlan?.weeklySchedule ? calculateOverallProgress(workoutPlan.weeklySchedule) : { completed: 0, total: 0, percentage: 0, remaining: 0 };
  
  // Function to toggle exercise completion
  const toggleExerciseCompletion = (dayIndex, exerciseIndex) => {
    const day = workoutPlan?.weeklySchedule?.[dayIndex];
    const exercise = day?.exercises?.[exerciseIndex];
    if (day && exercise) {
      contextToggleExerciseCompletion(dayIndex, exerciseIndex, exercise.name, day.day);
    }
  };

  useEffect(() => {
    // Fetch current workout plan
    const fetchWorkoutPlan = async () => {
      try {
        const response = await workoutService.getCurrentPlan();
        if (response.success && response.data.plan) {
          // Transform the response to match the expected format
          const plan = response.data.plan;
          
          // Debug log to see what we're getting
          console.log('Backend response:', response.data);
          
          // Create a more robust transformation
          const transformedPlan = {
            id: plan.id || Date.now(),
            name: plan.name || `${intensity.charAt(0).toUpperCase() + intensity.slice(1)} ${focusArea} Program`,
            duration: `${plan.durationWeeks || 4} weeks`,
            daysPerWeek: plan.daysPerWeek || daysPerWeek,
            focusAreas: plan.bodyPartFocus ? [plan.bodyPartFocus] : [focusArea],
            progress: plan.progress || 0,
            currentWeek: plan.currentWeek || 1,
            totalWeeks: plan.durationWeeks || 4,
            
            // Handle workouts data more carefully
            weeklySchedule: plan.workouts ? 
              (Array.isArray(plan.workouts) ? plan.workouts : [plan.workouts]).map((workout, index) => {
                const isRestDay = workout.description && workout.description.toLowerCase().includes('rest');
                
                return {
                  day: workout.name || workout.day_name || `Day ${workout.day_number || index + 1}`,
                  focus: isRestDay ? 'Rest Day' : (workout.description || workout.exercise_type || 'Workout'),
                  type: isRestDay ? 'rest' : 'active',
                  exercises: isRestDay ? [] : [
                    { name: workout.description || 'Sample Exercise', details: '3 sets of 8-12 reps' },
                    { name: 'Core Exercise', details: '4 sets of 6-10 reps' },
                  ],
                };
              }) : [
                // Fallback schedule if no workouts provided
                { day: 'Monday', focus: 'Chest & Triceps', type: 'active', exercises: [{ name: 'Bench Press', details: '3 sets of 8-12 reps' }] },
                { day: 'Tuesday', focus: 'Back & Biceps', type: 'active', exercises: [{ name: 'Pull-ups', details: '3 sets of 6-10 reps' }] },
                { day: 'Wednesday', focus: 'Rest Day', type: 'rest', exercises: [] },
                { day: 'Thursday', focus: 'Legs', type: 'active', exercises: [{ name: 'Squats', details: '3 sets of 8-12 reps' }] },
                { day: 'Friday', focus: 'Shoulders & Abs', type: 'active', exercises: [{ name: 'Military Press', details: '3 sets of 8-12 reps' }] },
              ],
            
            todayWorkout: plan.workouts && plan.workouts.length > 0 
              ? (plan.workouts[0].description || plan.workouts[0].exercise_type || 'Workout available') 
              : 'Chest & Triceps workout',
            
            upcomingSessions: plan.workouts && plan.workouts.length > 0 
              ? (Array.isArray(plan.workouts) ? plan.workouts : [plan.workouts]).slice(0, 3).map((w, index) => ({
                day: w.name || w.day_name || `Day ${w.day_number || index + 1}`,
                focus: w.description || w.exercise_type || 'Session'
              })) 
              : [
                { day: 'Today', focus: 'Chest & Triceps' },
                { day: 'Tomorrow', focus: 'Back & Biceps' },
                { day: 'Day 3', focus: 'Legs' }
              ],
          };
          
          console.log('Transformed plan:', transformedPlan);
          setWorkoutPlan(transformedPlan);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
        setLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, []);

  const generateNewPlan = async () => {
    setGeneratingPlan(true);
    
    // Call backend to generate new plan using AI
    const planData = {
      intensity,
      daysPerWeek,
      focusArea,
    };

    try {
      const response = await workoutService.generateWorkoutPlan(planData);

      if (response.success) {
        // Transform the response to match the expected format
        const plan = response.data.plan;
        
        // Debug log to see what we're getting
        console.log('Generate plan response:', response.data);
        
        // Create a more robust transformation
        const transformedPlan = {
          id: plan.id || Date.now(),
          name: plan.name || `${intensity.charAt(0).toUpperCase() + intensity.slice(1)} ${focusArea} Program`,
          duration: `${plan.durationWeeks || 4} weeks`,
          daysPerWeek: plan.daysPerWeek || daysPerWeek,
          focusAreas: plan.bodyPartFocus ? [plan.bodyPartFocus] : [focusArea],
          progress: plan.progress || 0,
          currentWeek: plan.currentWeek || 1,
          totalWeeks: plan.durationWeeks || 4,
          
          // Handle detailed workout data from AI or database
          weeklySchedule: plan.weeklySchedule ? 
            // If the plan has weeklySchedule (AI-generated), use it directly
            plan.weeklySchedule.map((day, index) => {
              const isRestDay = day.type === 'rest';
              
              // Extract exercises from AI-generated plan
              let exercises = [];
              if (day.exercises && Array.isArray(day.exercises)) {
                exercises = day.exercises.map((exercise, exIndex) => ({
                  name: exercise.name,
                  details: `Sets: ${exercise.sets || 3}, Reps: ${exercise.reps || '8-12'}, Rest: ${exercise.rest || '60-90 sec'}`
                }));
              } else {
                // Fallback if no exercises in AI plan
                exercises = isRestDay ? [] : [
                  { name: 'Compound Movement', details: '3 sets of 8-12 reps' },
                  { name: 'Accessory Work', details: '3 sets of 10-15 reps' },
                  { name: 'Core Exercise', details: '3 sets of 15-20 reps' },
                ];
              }
              
              return {
                day: day.day || `Day ${index + 1}`,
                focus: isRestDay ? 'Rest Day' : (day.focus || 'Detailed Workout'),
                type: isRestDay ? 'rest' : 'active',
                muscleGroups: day.muscleGroups || [],
                exercises: exercises,
                duration: day.duration ? parseInt(day.duration) || 45 : 45,
              };
            }) : 
            // If no weeklySchedule, fall back to database workouts
            plan.workouts ? 
              (Array.isArray(plan.workouts) ? plan.workouts : [plan.workouts]).map((workout, index) => {
                const exerciseDetails = workout.exercise_details;
                const isRestDay = workout.description && workout.description.toLowerCase().includes('rest');
                
                // Extract detailed exercise information
                let exercises = [];
                if (exerciseDetails && exerciseDetails.exercises) {
                  exercises = exerciseDetails.exercises.map((exercise, exIndex) => ({
                    name: exercise,
                    details: `${exerciseDetails.sets || 3} sets of ${exerciseDetails.reps || '8-12'} reps, ${exerciseDetails.rest || '60-90 sec'} rest`
                  }));
                } else if (!isRestDay) {
                  // Fallback exercises if no detailed info
                  exercises = [
                    { name: 'Compound Movement', details: '3 sets of 8-12 reps' },
                    { name: 'Accessory Work', details: '3 sets of 10-15 reps' },
                    { name: 'Core Exercise', details: '3 sets of 15-20 reps' },
                  ];
                }
                
                return {
                  day: workout.name || workout.day_name || `Day ${workout.day_number || index + 1}`,
                  focus: isRestDay ? 'Rest Day' : (workout.description || 'Detailed Workout'),
                  type: isRestDay ? 'rest' : 'active',
                  muscleGroups: exerciseDetails?.muscleGroups || [],
                  exercises: exercises,
                  duration: workout.estimated_duration_minutes || 45,
                };
              }) : [
              // Fallback schedule if no workouts provided
              { day: 'Monday', focus: 'Chest & Triceps', type: 'active', muscleGroups: ['Chest', 'Triceps'], exercises: [{ name: 'Bench Press', details: '3 sets of 8-12 reps' }, { name: 'Push-ups', details: '3 sets of 12-15 reps' }], duration: 45 },
              { day: 'Tuesday', focus: 'Back & Biceps', type: 'active', muscleGroups: ['Back', 'Biceps'], exercises: [{ name: 'Pull-ups', details: '3 sets of 6-10 reps' }, { name: 'Rows', details: '3 sets of 8-12 reps' }], duration: 45 },
              { day: 'Wednesday', focus: 'Legs', type: 'active', muscleGroups: ['Legs'], exercises: [{ name: 'Squats', details: '3 sets of 8-12 reps' }, { name: 'Lunges', details: '3 sets of 10 reps each leg' }], duration: 45 },
              { day: 'Thursday', focus: 'Shoulders & Abs', type: 'active', muscleGroups: ['Shoulders', 'Abs'], exercises: [{ name: 'Shoulder Press', details: '3 sets of 8-12 reps' }, { name: 'Planks', details: '3 sets of 30-60 seconds' }], duration: 45 },
              { day: 'Friday', focus: 'Full Body', type: 'active', muscleGroups: ['Full Body'], exercises: [{ name: 'Deadlifts', details: '3 sets of 6-10 reps' }, { name: 'Burpees', details: '3 sets of 8-12 reps' }], duration: 50 },
            ],
          
          todayWorkout: plan.workouts && plan.workouts.length > 0 
            ? (plan.workouts[0].description || plan.workouts[0].exercise_type || 'Workout available') 
            : 'Chest & Triceps workout',
          
          upcomingSessions: plan.workouts && plan.workouts.length > 0 
            ? (Array.isArray(plan.workouts) ? plan.workouts : [plan.workouts]).slice(0, 3).map((w, index) => ({
              day: w.name || w.day_name || `Day ${w.day_number || index + 1}`,
              focus: w.description || w.exercise_type || 'Session'
            })) 
            : [
              { day: 'Today', focus: 'Chest & Triceps' },
              { day: 'Tomorrow', focus: 'Back & Biceps' },
              { day: 'Day 3', focus: 'Legs' }
            ],
        };
        
        console.log('Generated transformed plan:', transformedPlan);
        
        setWorkoutPlan(transformedPlan);
        
        // Reset completion status when generating new plan
        resetProgress();
      } else {
        alert("Error generating plan: " + response.message);
      }
    } catch (error) {
      console.error("Error generating workout plan:", error);
      alert("Error generating workout plan");
    } finally {
      setGeneratingPlan(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading workout plan...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Workout Plan</h1>
          <p className="text-gray-400">
            Generate personalized workout plans with AI
          </p>
        </div>

        {/* Plan Generation Options */}
        <div className="flex flex-wrap gap-4">
          <select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="p-2 border border-dark-600 rounded-lg bg-dark-700 text-white"
          >
            <option value="beginner" className="bg-dark-700 text-white">
              Beginner
            </option>
            <option value="intermediate" className="bg-dark-700 text-white">
              Intermediate
            </option>
            <option value="advanced" className="bg-dark-700 text-white">
              Advanced
            </option>
          </select>

          <select
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(Number(e.target.value))}
            className="p-2 border border-dark-600 rounded-lg bg-dark-700 text-white"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <option key={num} value={num} className="bg-dark-700 text-white">
                {num} days/week
              </option>
            ))}
          </select>

          <select
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}
            className="p-2 border border-dark-600 rounded-lg bg-dark-700 text-white"
          >
            <option value="strength" className="bg-dark-700 text-white">
              Strength
            </option>
            <option value="hypertrophy" className="bg-dark-700 text-white">
              Muscle Building
            </option>
            <option value="endurance" className="bg-dark-700 text-white">
              Endurance
            </option>
            <option value="weight_loss" className="bg-dark-700 text-white">
              Weight Loss
            </option>
            <option value="custom" className="bg-dark-700 text-white">
              Custom Focus
            </option>
          </select>

          <button
            onClick={generateNewPlan}
            disabled={generatingPlan}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              generatingPlan 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-primary-500 hover:bg-primary-600'
            } text-white`}
          >
            {generatingPlan ? 'Generating...' : 'Generate New Plan'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan Overview - taking full width on small screens and 3/3 on larger screens */}
        <div className="lg:col-span-3 bg-dark-700 p-6 rounded-lg shadow border border-dark-600">
          <h2 className="text-xl font-semibold text-white mb-4">
            Current Workout Plan
          </h2>

          {workoutPlan ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">
                    {workoutPlan.name || 'Custom Workout Plan'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-primary-500/10 p-4 rounded-lg border border-dark-600">
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="font-semibold text-white">{workoutPlan.duration || '4 weeks'}</p>
                  </div>
                  <div className="bg-secondary-500/10 p-4 rounded-lg border border-dark-600">
                    <p className="text-sm text-gray-400">Days per week</p>
                    <p className="font-semibold text-white">{workoutPlan.daysPerWeek || daysPerWeek} days</p>
                  </div>
                  <div className="bg-purple-500/10 p-4 rounded-lg border border-dark-600">
                    <p className="text-sm text-gray-400">Focus Areas</p>
                    <p className="font-semibold text-white">{workoutPlan.focusAreas?.join(', ') || focusArea}</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-4">
                Weekly Schedule
              </h3>
              <div className="mb-4 p-4 bg-dark-600 rounded-lg border border-dark-500">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-green-400">Exercise Progress</h4>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{progress.percentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-4">
                {workoutPlan.weeklySchedule?.map((day, index) => (
                  <div 
                    key={day.day || `day-${index}`}
                    className="border rounded-lg p-4 border-dark-600 bg-dark-600"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-white">
                          {day.focus.includes(day.day) ? day.focus : `${day.day} - ${day.focus}`}
                        </h4>
                        {day.muscleGroups && day.muscleGroups.length > 0 && (
                          <p className="text-xs text-gray-400 mt-1">
                            Target: {day.muscleGroups.join(', ')}
                          </p>
                        )}

                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {day.type === 'rest' ? (
                          <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                            REST DAY
                          </span>
                        ) : day.type === 'today' ? (
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                            TODAY
                          </span>
                        ) : day.type === 'completed' ? (
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                            COMPLETED
                          </span>
                        ) : null}
                      </div>
                    </div>
                    {day.type !== 'rest' && day.exercises?.length > 0 ? (
                      <div className="mt-3">
                        <h5 className="text-sm font-medium text-gray-300 mb-2">Exercises:</h5>
                        <ul className="text-sm text-gray-400 space-y-2 mb-4">
                          {day.exercises.map((exercise, exIndex) => {
                            // Check if the exercise name is a generic muscle group and handle accordingly
                            const isGenericMuscleGroup = exercise.name && 
                              (exercise.name.toLowerCase().includes('chest & triceps') || 
                               exercise.name.toLowerCase().includes('back & biceps') ||
                               exercise.name.toLowerCase().includes('legs') ||
                               exercise.name.toLowerCase().includes('shoulders & abs') ||
                               exercise.name.toLowerCase().includes('full body') ||
                               exercise.name.toLowerCase().includes('core')); 
                            
                            const displayExerciseName = isGenericMuscleGroup 
                              ? `${exercise.name.split('&')[0].trim()} Press` // Provide a more specific exercise name
                              : exercise.name;
                            
                            const completionKey = `${index}-${exIndex}`;
                            const isCompleted = completedExercises[completionKey] || false;
                            const videoUrl = getEmbeddedVideoUrl(displayExerciseName);
                            
                            return (
                              <li key={exIndex} className="flex items-start gap-2 bg-dark-700 p-3 rounded hover:bg-dark-600 transition-colors">
                                <button 
                                  onClick={() => toggleExerciseCompletion(index, exIndex)}
                                  className="mt-0.5 focus:outline-none"
                                  aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                                >
                                  {isCompleted ? (
                                    <FaCheckCircle className="text-green-500 text-lg" />
                                  ) : (
                                    <FaRegCircle className="text-gray-500 text-lg" />
                                  )}
                                </button>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-white">{displayExerciseName}</span>
                                      <button 
                                        onClick={() => {
                                          setSelectedVideo(videoUrl);
                                          setShowVideoModal(true);
                                        }}
                                        className="ml-2 flex-shrink-0 text-blue-400 hover:text-blue-300 transition-colors"
                                        aria-label={`Watch ${displayExerciseName} tutorial video`}
                                      >
                                        <FaPlayCircle className="text-sm" />
                                      </button>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                      {exercise.details}
                                    </div>
                                    {isCompleted && (
                                      <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 self-start">
                                        Completed ✓
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>

                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">Complete recovery day - focus on sleep, hydration, and nutrition</p>
                    )}
                  </div>
                )) || (
                  // Fallback if no weekly schedule exists
                  <div className="text-center py-8 text-gray-400">
                    No schedule available. Generate a new plan to see your workout schedule.
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No workout plan available. Generate a new plan to get started.
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-700 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-dark-600">
              <h3 className="text-lg font-semibold text-white">Exercise Tutorial</h3>
              <button 
                onClick={() => {
                  setShowVideoModal(false);
                  setSelectedVideo(null);
                }}
                className="text-gray-400 hover:text-white"
                aria-label="Close video"
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <div className="aspect-video w-full">
                <iframe
                  src={selectedVideo}
                  title="Exercise Tutorial"
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlan;
