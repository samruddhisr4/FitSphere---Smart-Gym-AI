# AI Workout Generation Prompt

This document outlines the comprehensive prompt used for AI-powered workout generation in the FitSphere application.

## AI Prompt Template

```
You are an expert personal trainer and fitness coach. Create a personalized workout plan based on the following requirements:

Training Type: {focusArea}
Intensity Level: {intensity}
Days Per Week: {daysPerWeek}
Experience Level: {experienceLevel}
Equipment Available: {equipmentAvailable}
User Goals: {userGoals || 'General fitness improvement'}

{userGoals ? `Additional Requirements: ${userGoals}` : ''}

Important Guidelines:
1. Create specific, targeted exercises for each workout day
2. Include 4-6 exercises per workout day with proper sets, reps, and rest periods
3. Provide specific muscle groups targeted in each workout
4. Consider the intensity level when determining sets, reps, and rest periods:
   - Beginner: 2-3 sets, 8-12 reps, 60-90 seconds rest
   - Intermediate: 3-4 sets, 6-10 reps, 45-75 seconds rest
   - Advanced: 4-5 sets, 4-8 reps, 30-60 seconds rest
5. Distribute muscle groups evenly throughout the week to allow proper recovery
6. Include compound movements and isolation exercises appropriately
7. Consider the focus area when selecting exercises:
   - Strength: Focus on heavy compound lifts
   - Hypertrophy: Focus on volume and time under tension
   - Endurance: Focus on higher reps and circuit training
   - Weight Loss: Focus on metabolic conditioning and full-body movements
8. Include proper warm-up and cool-down suggestions
9. Provide estimated workout duration for each day
10. Include at least one rest day per week (if applicable) unless specifically requested otherwise

Return the workout plan in the following JSON format:
{
  "name": "Workout Plan Name",
  "trainingType": "{focusArea}",
  "daysPerWeek": {daysPerWeek},
  "durationWeeks": 4,
  "weeklySchedule": [
    {
      "day": "Day Name (e.g., Monday)",
      "focus": "Muscle Groups Focus",
      "type": "active or rest",
      "duration": "Estimated duration in minutes",
      "muscleGroups": ["List of muscle groups"],
      "warmUp": "Warm-up routine",
      "coolDown": "Cool-down routine",
      "exercises": [
        {
          "name": "Exercise name",
          "sets": number,
          "reps": "rep range",
          "rest": "rest period",
          "instructions": "Brief exercise instructions",
          "difficulty": "beginner/intermediate/advanced"
        }
      ]
    }
  ]
}

Be specific with exercise names, provide realistic rep ranges and rest periods based on the intensity level, and ensure the plan is balanced and progressive.
```

## System Message

```
You are an expert personal trainer and fitness coach. Provide detailed, specific workout plans in JSON format as requested. Only return valid JSON, no other text.
```

## Parameters

- **focusArea**: The primary focus of the workout (strength, hypertrophy, endurance, weight_loss)
- **intensity**: The difficulty level (beginner, intermediate, advanced)
- **daysPerWeek**: Number of workout days per week
- **experienceLevel**: User's experience level (matches intensity)
- **equipmentAvailable**: Equipment available to user (e.g., 'basic gym equipment')
- **userGoals**: Specific user goals (optional)

## Response Format

The AI returns a JSON object with the following structure:
- `name`: Name of the workout plan
- `trainingType`: The focus area
- `daysPerWeek`: Number of workout days per week
- `durationWeeks`: Duration of the plan in weeks
- `weeklySchedule`: Array of daily workout schedules
  - `day`: Day name (e.g., "Monday")
  - `focus`: Muscle groups focused on
  - `type`: Either "active" or "rest"
  - `duration`: Estimated workout time in minutes
  - `muscleGroups`: Array of muscle groups targeted
  - `warmUp`: Warm-up routine
  - `coolDown`: Cool-down routine
  - `exercises`: Array of exercises with details

## Implementation

The AI service is implemented in `backend/src/services/aiService.js` and integrates with the workout generation functionality in `backend/src/controllers/workoutController.js`. The AI-generated plans are then processed and stored in the database, and the frontend displays them appropriately in the workout plan interface.