// AI Service for workout generation using OpenAI or Google Gemini API
require("dotenv").config(); // Add this to ensure environment variables are loaded
const OpenAI = require("openai");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to set this in your .env file
});

// Alternative: Google Gemini API client
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

/**
 * Generate a personalized workout plan using AI
 * @param {Object} params - Parameters for workout generation
 * @param {string} params.intensity - Intensity level (beginner, intermediate, advanced)
 * @param {number} params.daysPerWeek - Number of workout days per week
 * @param {string} params.focusArea - Focus area (strength, hypertrophy, endurance, weight_loss)
 * @param {string} params.userGoals - User's specific goals
 * @param {string} params.experienceLevel - User's experience level
 * @param {string} params.equipmentAvailable - Equipment available to user
 * @returns {Promise<Object>} Generated workout plan
 */
const generateWorkoutPlanWithAI = async ({
  intensity,
  daysPerWeek,
  focusArea,
  userGoals = "",
  experienceLevel = "intermediate",
  equipmentAvailable = "basic gym equipment",
}) => {
  try {
    // Create a detailed prompt for the AI
    const prompt = `
You are an expert personal trainer and fitness coach. Create a personalized workout plan based on the following requirements:

Training Type: ${focusArea}
Intensity Level: ${intensity}
Days Per Week: ${daysPerWeek}
Experience Level: ${experienceLevel}
Equipment Available: ${equipmentAvailable}
User Goals: ${userGoals || "General fitness improvement"}

${userGoals ? `Additional Requirements: ${userGoals}` : ""}

Important Guidelines:
1. Create specific, targeted exercises for each workout day
2. Include 4-6 exercises per workout day with proper sets, reps, and rest periods according to the intensity chosen by the user to ensure effective training  
3. Provide specific muscle groups targeted in each workout
4. Consider the intensity level when determining sets, reps, and rest periods:
   - Beginner: 2-3 sets, 8-12 reps, 60-90 seconds rest
   - Intermediate: 3-4 sets, 6-10 reps, 45-75 seconds rest
   - Advanced: 4-5 sets, 4-8 reps, 30-60 seconds rest
   - Beginner: Allot fewer exercises with proper cardio included
   - Intermediate: Allow more exercises with a focus on intensity
   - Advanced: Allow more exercises with a focus on intensity and complexity
5. Distribute muscle groups evenly throughout the week to allow proper recovery,avoid alloting schedule on consecutive days if possible
6. Include compound movements and isolation exercises appropriately
7. Consider the focus area when selecting exercises:
   - Strength: Focus on heavy compound lifts
   - Hypertrophy: Focus on volume and time under tension
   - Endurance: Focus on higher reps and circuit training
   - Weight Loss: Focus on metabolic conditioning and full-body movements
8. Include proper warm-up and cool-down suggestions
9. Provide estimated workout duration for each day
10. Include at least one rest day per week (if applicable) unless specifically requested otherwise

The weekly schedule should follow a format for each day:
- Randomly select a muscle group to be trained on each day and allot exercise for each of those muscle
- Day(Monday/Tuesday/Wednesday/Thursday/Friday/Saturday/Sunday) - Muscle to be trained

For each exercise, consider the focus area (${focusArea}), intensity (${intensity}), and number of days (${daysPerWeek}) when deciding which exercises to include.

Return the workout plan in the following JSON format:
{
  "name": "${
    intensity.charAt(0).toUpperCase() + intensity.slice(1)
  } ${focusArea} Program",
  "trainingType": "${focusArea}",
  "daysPerWeek": ${daysPerWeek},
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

Be specific with exercise names, provide realistic rep ranges and rest periods based on the intensity level, and ensure the plan is balanced and progressive. Generate the exact number of days specified (${daysPerWeek}) and follow the format mentioned above. Most importantly, ensure that the muscleGroups field accurately reflects the exercises provided for that day.
`;

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Changed back to gpt-3.5-turbo since gpt-4 may not be available
      messages: [
        {
          role: "system",
          content:
            "You are an expert personal trainer and fitness coach. Provide detailed, specific workout plans in JSON format as requested. Only return valid JSON, no other text. Focus on clear exercise names and practical workout routines. Make sure to include accurate muscle group information that matches the exercises provided.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
      response_format: { type: "json_object" },
    });

    // Parse the AI response
    const aiResponse = completion.choices[0].message.content.trim();
    console.log("AI Response received:", aiResponse.substring(0, 200) + "...");

    // Clean up the response to extract JSON if it contains extra text
    let jsonStart = aiResponse.indexOf("{");
    let jsonEnd = aiResponse.lastIndexOf("}") + 1;

    if (jsonStart !== -1 && jsonEnd !== 0) {
      const jsonString = aiResponse.substring(jsonStart, jsonEnd);
      const rawAiPlan = JSON.parse(jsonString);

      // Validate that the AI returned the expected structure
      if (!rawAiPlan.weeklySchedule || !Array.isArray(rawAiPlan.weeklySchedule)) {
        throw new Error("Invalid response structure: missing weeklySchedule array");
      }

      // Transform the AI-generated plan to match our expected database structure
      // The AI returns a weeklySchedule but we need to adapt it to our workout records
      const transformedPlan = {
        ...rawAiPlan,
        // Convert weeklySchedule to the format expected by our database
        workouts: rawAiPlan.weeklySchedule.map((day, index) => ({
          day_number: index + 1,
          name: day.day,
          description: day.focus,
          exercise_details: {
            muscleGroups: day.muscleGroups || [],
            exercises: day.exercises || [],
            warmUp: day.warmUp || "5-10 minute dynamic warm-up",
            coolDown: day.coolDown || "5-10 minute static stretching",
            sets: day.exercises && day.exercises.length > 0 ? day.exercises[0].sets : 3,
            reps: day.exercises && day.exercises.length > 0 ? day.exercises[0].reps : "8-12",
            rest:
              day.exercises && day.exercises.length > 0
                ? day.exercises[0].rest
                : "60-90 seconds",
          },
          estimated_duration_minutes: parseInt(day.duration) || 45,
          type: day.type || "active",
        })),
      };

      return {
        success: true,
        plan: transformedPlan,
      };
    } else {
      throw new Error("Invalid JSON response from AI");
    }
  } catch (error) {
    console.error("Error generating workout plan with AI:", error);

    // Return an error response
    return {
      success: false,
      error: error.message,
      plan: null, // Changed from fallbackPlan to plan for consistency
    };
  }
};

/**
 * Alternative function using Google Gemini API
 */
const generateWorkoutPlanWithGemini = async ({
  intensity,
  daysPerWeek,
  focusArea,
  userGoals = "",
  experienceLevel = "intermediate",
  equipmentAvailable = "basic gym equipment",
}) => {
  try {
    // This would be implemented similarly to the OpenAI version
    // using the Google Generative AI SDK
    /*
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    */

    // For now, we'll throw an error indicating this needs to be implemented
    throw new Error("Google Gemini API implementation pending");
  } catch (error) {
    console.error("Error generating workout plan with Gemini:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = {
  generateWorkoutPlanWithAI,
  generateWorkoutPlanWithGemini,
};