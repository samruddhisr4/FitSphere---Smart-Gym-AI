// Helper function to create a fallback workout plan when AI fails
const createFallbackWorkoutPlan = (intensity, daysPerWeek, focusArea) => {
  // Define workout templates based on focus area and intensity
  const workoutTemplates = {
    strength: {
      beginner: [
        { muscleGroups: ["Chest", "Triceps"], exercises: [
          { name: "Flat Dumbbell Chest Press", sets: 2, reps: "8-12", rest: "60-90 seconds", instructions: "Lie on flat bench and press dumbbells upward, focusing on squeezing chest muscles", difficulty: "beginner" },
          { name: "Incline Dumbbell Chest Press", sets: 2, reps: "8-12", rest: "60-90 seconds", instructions: "Adjust bench to 30-45 degree incline and press dumbbells upward", difficulty: "beginner" },
          { name: "Chest Dips", sets: 2, reps: "6-10", rest: "60-90 seconds", instructions: "Use parallel bars or bench to perform dips, keeping lean forward slightly to target chest", difficulty: "beginner" },
          { name: "Dumbbell Flyes", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "On flat bench, move arms in arc motion with light weights, keeping slight bend in elbows", difficulty: "beginner" },
          { name: "Overhead Dumbbell Shoulder Press", sets: 2, reps: "8-10", rest: "60-90 seconds", instructions: "Sit on bench with back support, press dumbbells overhead from shoulder height", difficulty: "beginner" },
          { name: "Dumbbell Lateral Raises", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Stand upright and raise arms to sides with light weights, squeeze shoulders at top", difficulty: "beginner" },
          { name: "Tricep Pushdowns", sets: 2, reps: "10-12", rest: "60-90 seconds", instructions: "Using cable machine, push down with straight arms focusing on tricep extension", difficulty: "beginner" },
          { name: "Overhead Tricep Extension", sets: 2, reps: "10-12", rest: "60-90 seconds", instructions: "Hold single dumbbell overhead, bend elbow to lower weight behind head, then extend", difficulty: "beginner" }
        ]},
        { muscleGroups: ["Back", "Biceps"], exercises: [
          { name: "Lat Pulldowns", sets: 2, reps: "8-12", rest: "60-90 seconds", instructions: "Grab wide bar and pull down to upper chest, squeezing shoulder blades together", difficulty: "beginner" },
          { name: "Cable Seated Rows", sets: 2, reps: "8-12", rest: "60-90 seconds", instructions: "Pull cable handles toward torso while seated, keeping back straight", difficulty: "beginner" },
          { name: "Dumbbell Bicep Curls", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Stand with feet shoulder-width apart, curl dumbbells toward shoulders", difficulty: "beginner" },
          { name: "Hammer Curls", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Hold dumbbells with neutral grip (palms facing each other), curl upward", difficulty: "beginner" },
          { name: "Reverse Flyes", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Lean forward slightly and move arms back with slight bend in elbows, targeting rear delts", difficulty: "beginner" },
          { name: "Face Pulls", sets: 2, reps: "12-15", rest: "60-90 seconds", instructions: "Using cable machine, pull rope toward face with thumbs up, squeeze rear delts", difficulty: "beginner" },
          { name: "Wide-Grip Pulldowns", sets: 2, reps: "8-12", rest: "60-90 seconds", instructions: "Grab bar wider than shoulders, pull down to upper chest, focus on lats", difficulty: "beginner" },
          { name: "Barbell Rows", sets: 2, reps: "8-12", rest: "60-90 seconds", instructions: "Bend at waist, pull barbell to lower rib cage while keeping back straight", difficulty: "beginner" }
        ]},
        { muscleGroups: ["Legs"], exercises: [
          { name: "Bodyweight Squats", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Stand with feet shoulder-width apart, lower body by bending knees and hips, keep chest up", difficulty: "beginner" },
          { name: "Walking Lunges", sets: 2, reps: "8-12 each leg", rest: "60-90 seconds", instructions: "Step forward with one leg, lower hips until both knees are bent at 90 degrees", difficulty: "beginner" },
          { name: "Leg Press", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Sit on machine, push weight away with feet, focus on quadriceps", difficulty: "beginner" },
          { name: "Standing Calf Raises", sets: 2, reps: "15-20", rest: "60-90 seconds", instructions: "Stand upright and raise heels while supporting body weight, lower slowly", difficulty: "beginner" },
          { name: "Glute Bridges", sets: 2, reps: "12-15", rest: "60-90 seconds", instructions: "Lie on back, bend knees, lift hips by squeezing glutes and hamstrings", difficulty: "beginner" },
          { name: "Romanian Deadlifts (light)", sets: 2, reps: "8-12", rest: "60-90 seconds", instructions: "Keep legs slightly bent, hinge at hips to lower weight, feel hamstring stretch", difficulty: "beginner" },
          { name: "Leg Extensions", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Sit on machine, extend legs against pad, focus on quadriceps", difficulty: "beginner" },
          { name: "Leg Curls", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Lie face down, curl legs against pad, target hamstrings", difficulty: "beginner" }
        ]}
      ],
      intermediate: [
        { muscleGroups: ["Chest", "Triceps"], exercises: [
          { name: "Barbell Bench Press", sets: 3, reps: "6-8", rest: "45-75 seconds", instructions: "Press barbell from chest to arms extended, focus on controlled movement", difficulty: "intermediate" },
          { name: "Incline Barbell Press", sets: 3, reps: "6-8", rest: "45-75 seconds", instructions: "Adjust bench to 30-45 degree incline, press barbell upward for upper chest", difficulty: "intermediate" },
          { name: "Close-Grip Bench Press", sets: 3, reps: "6-8", rest: "45-75 seconds", instructions: "Narrow grip for tricep emphasis, press barbell with controlled form", difficulty: "intermediate" },
          { name: "Weighted Dips", sets: 3, reps: "6-10", rest: "45-75 seconds", instructions: "Add weight for increased difficulty, keep lean forward for chest focus", difficulty: "intermediate" },
          { name: "Cable Crossovers", sets: 3, reps: "10-12", rest: "45-75 seconds", instructions: "Bring cables together in front of body, feel chest contraction at peak", difficulty: "intermediate" },
          { name: "Decline Dumbbell Press", sets: 3, reps: "6-8", rest: "45-75 seconds", instructions: "Lie on decline bench, press dumbbells upward for lower chest focus", difficulty: "intermediate" },
          { name: "Dumbbell Pullovers", sets: 3, reps: "8-10", rest: "45-75 seconds", instructions: "Lie on bench, extend arms over head with single dumbbell, stretch chest", difficulty: "intermediate" },
          { name: "Tricep Dumbbell Kickbacks", sets: 3, reps: "10-12", rest: "45-75 seconds", instructions: "Bend at waist, extend arms backward focusing on tricep extension", difficulty: "intermediate" }
        ]},
        { muscleGroups: ["Back", "Biceps"], exercises: [
          { name: "Pull-ups", sets: 3, reps: "4-8", rest: "45-75 seconds", instructions: "Pull body up until chin passes bar, focus on lat engagement", difficulty: "intermediate" },
          { name: "Barbell Bent-Over Rows", sets: 3, reps: "6-8", rest: "45-75 seconds", instructions: "Bend at waist, pull barbell to lower rib cage, squeeze shoulder blades", difficulty: "intermediate" },
          { name: "T-Bar Rows", sets: 3, reps: "6-8", rest: "45-75 seconds", instructions: "Using T-bar machine, pull weight to upper abdomen, engage lats", difficulty: "intermediate" },
          { name: "Preacher Curls", sets: 3, reps: "8-10", rest: "45-75 seconds", instructions: "Curl with arms supported on pad, isolate biceps completely", difficulty: "intermediate" },
          { name: "Cable Rows (Wide Grip)", sets: 3, reps: "8-10", rest: "45-75 seconds", instructions: "Pull cable handles to torso with wide grip, squeeze back muscles", difficulty: "intermediate" },
          { name: "Chin-ups", sets: 3, reps: "4-8", rest: "45-75 seconds", instructions: "Use underhand grip, pull body up until chin passes bar", difficulty: "intermediate" },
          { name: "Cable Lat Pulldowns (Close Grip)", sets: 3, reps: "8-10", rest: "45-75 seconds", instructions: "Use close grip, pull to chest focusing on middle back", difficulty: "intermediate" },
          { name: "Hammer Curls (Cable)", sets: 3, reps: "10-12", rest: "45-75 seconds", instructions: "Use cable with neutral grip, curl upward for brachialis", difficulty: "intermediate" }
        ]},
        { muscleGroups: ["Legs"], exercises: [
          { name: "Barbell Back Squats", sets: 3, reps: "6-8", rest: "45-75 seconds", instructions: "Squat with barbell on upper traps, depth to at least parallel", difficulty: "intermediate" },
          { name: "Romanian Deadlifts", sets: 3, reps: "6-8", rest: "45-75 seconds", instructions: "Hinge at hips with straight legs, feel hamstring and glute stretch", difficulty: "intermediate" },
          { name: "Bulgarian Split Squats", sets: 3, reps: "6-8 each leg", rest: "45-75 seconds", instructions: "Rear foot elevated on bench, perform single-leg squat", difficulty: "intermediate" },
          { name: "Leg Press (Single Leg)", sets: 3, reps: "8-10 each leg", rest: "45-75 seconds", instructions: "Perform leg press with one leg at a time for balance", difficulty: "intermediate" },
          { name: "Leg Extensions (Machine)", sets: 3, reps: "10-12", rest: "45-75 seconds", instructions: "Extend legs against machine pad, focus on quadriceps", difficulty: "intermediate" },
          { name: "Lying Leg Curls (Machine)", sets: 3, reps: "10-12", rest: "45-75 seconds", instructions: "Curl legs against machine resistance, target hamstrings", difficulty: "intermediate" },
          { name: "Walking Lunges (Weighted)", sets: 3, reps: "8-10 each leg", rest: "45-75 seconds", instructions: "Hold dumbbells and perform walking lunges with added weight", difficulty: "intermediate" },
          { name: "Hip Thrusts", sets: 3, reps: "8-12", rest: "45-75 seconds", instructions: "Sit against bench, thrust hips up with barbell across hips, squeeze glutes", difficulty: "intermediate" }
        ]}
      ],
      advanced: [
        { muscleGroups: ["Chest", "Triceps"], exercises: [
          { name: "Heavy Barbell Bench Press", sets: 4, reps: "4-6", rest: "30-60 seconds", instructions: "Press maximum weight with perfect form, spotter recommended", difficulty: "advanced" },
          { name: "Incline Dumbbell Bench Press (Heavy)", sets: 4, reps: "5-7", rest: "30-60 seconds", instructions: "Press heavy dumbbells on incline for upper chest development", difficulty: "advanced" },
          { name: "Close-Grip Barbell Bench Press", sets: 4, reps: "5-7", rest: "30-60 seconds", instructions: "Narrow grip for intense tricep focus, control the weight", difficulty: "advanced" },
          { name: "Weighted Dips (Heavy)", sets: 4, reps: "6-8", rest: "30-60 seconds", instructions: "Add significant weight for advanced chest and tricep development", difficulty: "advanced" },
          { name: "Cable Crossovers (Constant Tension)", sets: 4, reps: "8-10", rest: "30-60 seconds", instructions: "Maintain constant tension on chest muscles throughout movement", difficulty: "advanced" },
          { name: "Decline Barbell Bench Press", sets: 4, reps: "4-6", rest: "30-60 seconds", instructions: "Lower chest focus with decline angle, heavy weight with spotter", difficulty: "advanced" },
          { name: "JM Press", sets: 4, reps: "6-8", rest: "30-60 seconds", instructions: "Between bench press and skullcrushers, great tricep isolation", difficulty: "advanced" },
          { name: "Single-Arm Dumbbell Press", sets: 4, reps: "6-8 each arm", rest: "30-60 seconds", instructions: "Unilateral pressing for core stability and chest balance", difficulty: "advanced" }
        ]},
        { muscleGroups: ["Back", "Biceps"], exercises: [
          { name: "Weighted Pull-ups (Heavy)", sets: 4, reps: "4-6", rest: "30-60 seconds", instructions: "Add significant weight for advanced back development", difficulty: "advanced" },
          { name: "Deadlifts (Heavy)", sets: 4, reps: "3-5", rest: "30-60 seconds", instructions: "Maximum back development with proper form, engage entire posterior chain", difficulty: "advanced" },
          { name: "Weighted Chin-ups (Heavy)", sets: 4, reps: "4-6", rest: "30-60 seconds", instructions: "Add weight for advanced bicep and back development", difficulty: "advanced" },
          { name: "Concentration Curls (Heavy)", sets: 4, reps: "6-8 each arm", rest: "30-60 seconds", instructions: "Isolate biceps with arm braced, maximum contraction", difficulty: "advanced" },
          { name: "Cable Face Pulls (Heavy)", sets: 4, reps: "8-10", rest: "30-60 seconds", instructions: "Pull cables toward face with wide grip, target rear delts and upper back", difficulty: "advanced" },
          { name: "T-Bar Row (Heavy)", sets: 4, reps: "4-6", rest: "30-60 seconds", instructions: "Pull heavy T-bar to upper abdomen, maximum back engagement", difficulty: "advanced" },
          { name: "Single-Arm Cable Rows", sets: 4, reps: "6-8 each arm", rest: "30-60 seconds", instructions: "Unilateral rowing for core stability and back balance", difficulty: "advanced" },
          { name: "Reverse-Grip Pulldowns", sets: 4, reps: "6-8", rest: "30-60 seconds", instructions: "Underhand grip targets different back muscles, especially lower lats", difficulty: "advanced" }
        ]},
        { muscleGroups: ["Legs"], exercises: [
          { name: "Front Squats (Heavy)", sets: 4, reps: "4-6", rest: "30-60 seconds", instructions: "Hold bar in front rack position, squat depth to parallel", difficulty: "advanced" },
          { name: "Bulgarian Split Squats (Heavy)", sets: 4, reps: "5-6 each leg", rest: "30-60 seconds", instructions: "Rear foot elevated with added weight, unilateral strength", difficulty: "advanced" },
          { name: "Single-Leg Romanian Deadlifts", sets: 4, reps: "5-6 each leg", rest: "30-60 seconds", instructions: "Hinge at hip with one leg, balance and strength challenge", difficulty: "advanced" },
          { name: "Weighted Bulgarian Split Squats", sets: 4, reps: "6-8 each leg", rest: "30-60 seconds", instructions: "Rear foot elevated on bench with dumbbells, unilateral focus", difficulty: "advanced" },
          { name: "Pistol Squats", sets: 4, reps: "3-5 each leg", rest: "30-60 seconds", instructions: "Single-leg squat with other leg extended, extreme balance", difficulty: "advanced" },
          { name: "Hack Squats (Machine)", sets: 4, reps: "6-8", rest: "30-60 seconds", instructions: "Machine-based squats for different quad activation", difficulty: "advanced" },
          { name: "Single-Leg Leg Press", sets: 4, reps: "6-8 each leg", rest: "30-60 seconds", instructions: "Leg press with one leg at a time for isolation", difficulty: "advanced" },
          { name: "Sissy Squats", sets: 4, reps: "6-8", rest: "30-60 seconds", instructions: "Quadriceps-focused with knees extending forward, challenging movement", difficulty: "advanced" }
        ]}
      ]
    },
    hypertrophy: {
      // Similar structure for hypertrophy
      beginner: [
        { muscleGroups: ["Chest", "Arms"], exercises: [
          { name: "Flat Dumbbell Chest Press", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Lie on flat bench and press dumbbells upward, focusing on squeezing chest muscles", difficulty: "beginner" },
          { name: "Incline Dumbbell Chest Press", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Adjust bench to 30-45 degree incline and press dumbbells upward", difficulty: "beginner" },
          { name: "Dumbbell Overhead Tricep Extension", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Hold single dumbbell overhead, bend elbow to lower weight behind head, then extend", difficulty: "beginner" },
          { name: "Dumbbell Bicep Curls", sets: 2, reps: "12-18", rest: "60-90 seconds", instructions: "Stand with feet shoulder-width apart, curl dumbbells toward shoulders", difficulty: "beginner" },
          { name: "Hammer Curls", sets: 2, reps: "12-18", rest: "60-90 seconds", instructions: "Hold dumbbells with neutral grip (palms facing each other), curl upward", difficulty: "beginner" },
          { name: "Cable Tricep Pushdowns", sets: 2, reps: "12-15", rest: "60-90 seconds", instructions: "Using cable machine, push down with straight arms focusing on tricep extension", difficulty: "beginner" },
          { name: "EZ-Bar Curls", sets: 2, reps: "12-15", rest: "60-90 seconds", instructions: "Using EZ-bar attachment, curl with comfortable grip to reduce wrist strain", difficulty: "beginner" },
          { name: "Cable Crossover Flyes", sets: 2, reps: "12-15", rest: "60-90 seconds", instructions: "Bring cables together in front of body with slight bend in elbows, feel chest squeeze", difficulty: "beginner" }
        ]},
        { muscleGroups: ["Back", "Legs"], exercises: [
          { name: "Lat Pulldowns", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Grab wide bar and pull down to upper chest, squeezing shoulder blades together", difficulty: "beginner" },
          { name: "Cable Seated Rows", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Pull cable handles toward torso while seated, keeping back straight", difficulty: "beginner" },
          { name: "Bodyweight Squats", sets: 2, reps: "12-18", rest: "60-90 seconds", instructions: "Stand with feet shoulder-width apart, lower body by bending knees and hips, keep chest up", difficulty: "beginner" },
          { name: "Leg Curls (Machine)", sets: 2, reps: "12-18", rest: "60-90 seconds", instructions: "Lie face down, curl legs against pad, target hamstrings", difficulty: "beginner" },
          { name: "Romanian Deadlifts (light)", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Keep legs slightly bent, hinge at hips to lower weight, feel hamstring stretch", difficulty: "beginner" },
          { name: "Walking Lunges", sets: 2, reps: "10-15 each leg", rest: "60-90 seconds", instructions: "Step forward with one leg, lower hips until both knees are bent at 90 degrees", difficulty: "beginner" },
          { name: "Leg Press", sets: 2, reps: "12-15", rest: "60-90 seconds", instructions: "Sit on machine, push weight away with feet, focus on quadriceps", difficulty: "beginner" },
          { name: "Cable Lat Pulldowns (Close Grip)", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Use close grip, pull to chest focusing on middle back", difficulty: "beginner" }
        ]},
        { muscleGroups: ["Shoulders", "Core"], exercises: [
          { name: "Overhead Dumbbell Shoulder Press", sets: 2, reps: "10-15", rest: "60-90 seconds", instructions: "Sit on bench with back support, press dumbbells overhead from shoulder height", difficulty: "beginner" },
          { name: "Dumbbell Lateral Raises", sets: 2, reps: "12-18", rest: "60-90 seconds", instructions: "Stand upright and raise arms to sides with light weights, squeeze shoulders at top", difficulty: "beginner" },
          { name: "Cable Crunches", sets: 2, reps: "15-20", rest: "60-90 seconds", instructions: "Kneel and perform crunches with cable attachment, target lower abs", difficulty: "beginner" },
          { name: "Russian Twists", sets: 2, reps: "15-20 each side", rest: "60-90 seconds", instructions: "Sit and twist torso while leaning back, touch ground on each side", difficulty: "beginner" },
          { name: "Planks", sets: 2, reps: "30-60 seconds", rest: "60-90 seconds", instructions: "Hold push-up position with core engaged", difficulty: "beginner" },
          { name: "Dumbbell Front Raises", sets: 2, reps: "12-15", rest: "60-90 seconds", instructions: "Stand upright and raise arms forward with light weights, target front delts", difficulty: "beginner" },
          { name: "Reverse Flyes (Dumbbell)", sets: 2, reps: "12-15", rest: "60-90 seconds", instructions: "Lean forward slightly and move arms back with slight bend in elbows, targeting rear delts", difficulty: "beginner" },
          { name: "Mountain Climbers", sets: 2, reps: "20-30 each leg", rest: "60-90 seconds", instructions: "In plank position, alternate bringing knees toward chest", difficulty: "beginner" }
        ]}
      ],
      intermediate: [
        { muscleGroups: ["Chest", "Arms"], exercises: [
          { name: "Barbell Bench Press", sets: 3, reps: "8-10", rest: "45-75 seconds", instructions: "Press barbell from chest to arms extended, focus on controlled movement", difficulty: "intermediate" },
          { name: "Incline Barbell Press", sets: 3, reps: "8-10", rest: "45-75 seconds", instructions: "Adjust bench to 30-45 degree incline, press barbell upward for upper chest", difficulty: "intermediate" },
          { name: "Close-Grip Bench Press", sets: 3, reps: "8-10", rest: "45-75 seconds", instructions: "Narrow grip for tricep emphasis, press barbell with controlled form", difficulty: "intermediate" },
          { name: "Preacher Curls", sets: 3, reps: "10-12", rest: "45-75 seconds", instructions: "Curl with arms supported on pad, isolate biceps completely", difficulty: "intermediate" },
          { name: "Cable Flyes", sets: 3, reps: "12-15", rest: "45-75 seconds", instructions: "Bring cables together in front of chest, feel chest contraction at peak", difficulty: "intermediate" },
          { name: "Decline Dumbbell Press", sets: 3, reps: "8-10", rest: "45-75 seconds", instructions: "Lie on decline bench, press dumbbells upward for lower chest focus", difficulty: "intermediate" },
          { name: "Tricep Dumbbell Kickbacks", sets: 3, reps: "12-15", rest: "45-75 seconds", instructions: "Bend at waist, extend arms backward focusing on tricep extension", difficulty: "intermediate" },
          { name: "Dumbbell Concentration Curls", sets: 3, reps: "10-12 each arm", rest: "45-75 seconds", instructions: "Sit and curl dumbbell with arm braced against inner thigh, isolate bicep", difficulty: "intermediate" }
        ]},
        { muscleGroups: ["Back", "Legs"], exercises: [
          { name: "Pull-ups", sets: 3, reps: "6-10", rest: "45-75 seconds", instructions: "Pull body up until chin passes bar, focus on lat engagement", difficulty: "intermediate" },
          { name: "Barbell Bent-Over Rows", sets: 3, reps: "8-10", rest: "45-75 seconds", instructions: "Bend at waist, pull barbell to lower rib cage, squeeze shoulder blades", difficulty: "intermediate" },
          { name: "Leg Press (Single Leg)", sets: 3, reps: "10-15 each leg", rest: "45-75 seconds", instructions: "Perform leg press with one leg at a time for balance", difficulty: "intermediate" },
          { name: "Romanian Deadlifts", sets: 3, reps: "8-10", rest: "45-75 seconds", instructions: "Hinge at hips with straight legs, feel hamstring and glute stretch", difficulty: "intermediate" },
          { name: "Leg Extensions (Machine)", sets: 3, reps: "12-15", rest: "45-75 seconds", instructions: "Extend legs against machine pad, focus on quadriceps", difficulty: "intermediate" },
          { name: "Lying Leg Curls (Machine)", sets: 3, reps: "12-15", rest: "45-75 seconds", instructions: "Curl legs against machine resistance, target hamstrings", difficulty: "intermediate" },
          { name: "T-Bar Rows", sets: 3, reps: "8-10", rest: "45-75 seconds", instructions: "Using T-bar machine, pull weight to upper abdomen, engage lats", difficulty: "intermediate" },
          { name: "Walking Lunges (Weighted)", sets: 3, reps: "10-12 each leg", rest: "45-75 seconds", instructions: "Hold dumbbells and perform walking lunges with added weight", difficulty: "intermediate" }
        ]},
        { muscleGroups: ["Shoulders", "Core"], exercises: [
          { name: "Overhead Barbell Press", sets: 3, reps: "8-10", rest: "45-75 seconds", instructions: "Press barbell overhead from shoulder height, keep core tight", difficulty: "intermediate" },
          { name: "Rear Delt Flyes (Machine)", sets: 3, reps: "12-15", rest: "45-75 seconds", instructions: "Use rear delt machine, pull handles back with slight bend in elbows", difficulty: "intermediate" },
          { name: "Weighted Russian Twists", sets: 3, reps: "15-20 each side", rest: "45-75 seconds", instructions: "Hold weight while twisting torso, touch ground on each side", difficulty: "intermediate" },
          { name: "Hanging Leg Raises", sets: 3, reps: "10-15", rest: "45-75 seconds", instructions: "Hang from bar and raise legs to 90 degrees", difficulty: "intermediate" },
          { name: "Weighted Planks", sets: 3, reps: "45-75 seconds", rest: "45-75 seconds", instructions: "Hold with added weight on back, keep core engaged", difficulty: "intermediate" },
          { name: "Dumbbell Lateral Raise (Supermans)", sets: 3, reps: "12-15", rest: "45-75 seconds", instructions: "Lie face down and raise arms and legs simultaneously, target rear delts", difficulty: "intermediate" },
          { name: "Cable Wood Chops", sets: 3, reps: "12-15 each side", rest: "45-75 seconds", instructions: "Pull cable diagonally across body, engage obliques", difficulty: "intermediate" },
          { name: "Ab Wheel Rollouts", sets: 3, reps: "8-12", rest: "45-75 seconds", instructions: "Roll wheel forward from kneeling position, engage entire core", difficulty: "intermediate" }
        ]}
      ],
      advanced: [
        { muscleGroups: ["Chest", "Arms"], exercises: [
          { name: "Heavy Barbell Bench Press", sets: 4, reps: "6-8", rest: "30-60 seconds", instructions: "Press maximum weight with perfect form, spotter recommended", difficulty: "advanced" },
          { name: "Incline Dumbbell Bench Press (Heavy)", sets: 4, reps: "7-9", rest: "30-60 seconds", instructions: "Press heavy dumbbells on incline for upper chest development", difficulty: "advanced" },
          { name: "Weighted Dips (Heavy)", sets: 4, reps: "6-10", rest: "30-60 seconds", instructions: "Add significant weight for advanced chest and tricep development", difficulty: "advanced" },
          { name: "Heavy Dumbbell Curls", sets: 4, reps: "8-10", rest: "30-60 seconds", instructions: "Use heavy dumbbells with strict form, focus on bicep contraction", difficulty: "advanced" },
          { name: "Cable Crossovers (Constant Tension)", sets: 4, reps: "10-12", rest: "30-60 seconds", instructions: "Maintain constant tension on chest muscles throughout movement", difficulty: "advanced" },
          { name: "JM Press", sets: 4, reps: "8-10", rest: "30-60 seconds", instructions: "Between bench press and skullcrushers, great tricep isolation", difficulty: "advanced" },
          { name: "Spider Curls", sets: 4, reps: "8-10", rest: "30-60 seconds", instructions: "Use preacher curl bench at steeper angle, maximize bicep stretch", difficulty: "advanced" },
          { name: "Cable Tricep Overhead Extensions", sets: 4, reps: "10-12", rest: "30-60 seconds", instructions: "Attach rope to high pulley, extend arms overhead with constant tension", difficulty: "advanced" }
        ]},
        { muscleGroups: ["Back", "Legs"], exercises: [
          { name: "Weighted Pull-ups (Heavy)", sets: 4, reps: "6-8", rest: "30-60 seconds", instructions: "Add significant weight for advanced back development", difficulty: "advanced" },
          { name: "T-Bar Row (Heavy)", sets: 4, reps: "6-8", rest: "30-60 seconds", instructions: "Pull heavy T-bar to upper abdomen, maximum back engagement", difficulty: "advanced" },
          { name: "Front Squats (Heavy)", sets: 4, reps: "6-8", rest: "30-60 seconds", instructions: "Hold bar in front rack position, squat depth to parallel", difficulty: "advanced" },
          { name: "Single-Leg Romanian Deadlifts", sets: 4, reps: "8-10 each leg", rest: "30-60 seconds", instructions: "Hinge at hip with one leg, balance and strength challenge", difficulty: "advanced" },
          { name: "Weighted Bulgarian Split Squats", sets: 4, reps: "8-10 each leg", rest: "30-60 seconds", instructions: "Rear foot elevated on bench with dumbbells, unilateral focus", difficulty: "advanced" },
          { name: "Single-Arm Dumbbell Rows", sets: 4, reps: "8-10 each arm", rest: "30-60 seconds", instructions: "Unilateral rowing for core stability and back balance", difficulty: "advanced" },
          { name: "Reverse-Grip Pulldowns", sets: 4, reps: "8-10", rest: "30-60 seconds", instructions: "Underhand grip targets different back muscles, especially lower lats", difficulty: "advanced" },
          { name: "Single-Leg Leg Press", sets: 4, reps: "8-10 each leg", rest: "30-60 seconds", instructions: "Leg press with one leg at a time for isolation", difficulty: "advanced" }
        ]},
        { muscleGroups: ["Shoulders", "Core"], exercises: [
          { name: "Push Press (Heavy)", sets: 4, reps: "6-8", rest: "30-60 seconds", instructions: "Combine dip and press movement with heavy weight, use momentum", difficulty: "advanced" },
          { name: "Weighted Lateral Raises", sets: 4, reps: "10-12", rest: "30-60 seconds", instructions: "Add weight for increased resistance, focus on shoulder isolation", difficulty: "advanced" },
          { name: "Weighted Cable Crunches", sets: 4, reps: "15-20", rest: "30-60 seconds", instructions: "Kneel and perform crunches with cable attachment and added weight", difficulty: "advanced" },
          { name: "Weighted Hanging Leg Raises", sets: 4, reps: "12-15", rest: "30-60 seconds", instructions: "Add weight while hanging, target lower abs", difficulty: "advanced" },
          { name: "Weighted Side Planks", sets: 4, reps: "60-90 seconds each side", rest: "30-60 seconds", instructions: "Hold with added weight, target obliques", difficulty: "advanced" },
          { name: "Turkish Get-ups", sets: 4, reps: "5-6 each arm", rest: "30-60 seconds", instructions: "Complex movement from lying to standing with weight overhead", difficulty: "advanced" },
          { name: "Weighted Ab Wheel Rollouts", sets: 4, reps: "10-15", rest: "30-60 seconds", instructions: "Roll wheel forward from kneeling position with added weight, engage entire core", difficulty: "advanced" },
          { name: "Cable Pallof Press", sets: 4, reps: "12-15 each side", rest: "30-60 seconds", instructions: "Resist rotation while pressing cable away from body, anti-rotation core exercise", difficulty: "advanced" }
        ]}
      ]
    },
    endurance: {
      // Similar structure for endurance
      beginner: [
        { muscleGroups: ["Cardio", "Light Weights"], exercises: [
          { name: "Brisk Walking", sets: 1, reps: "20-30 minutes", rest: "60-90 seconds", instructions: "Maintain steady pace with slight incline if possible", difficulty: "beginner" },
          { name: "Circuit Training (Light)", sets: 2, reps: "8-12 each exercise", rest: "30-60 seconds", instructions: "Perform exercises in quick succession with light weights", difficulty: "beginner" },
          { name: "Jumping Jacks", sets: 2, reps: "20-30", rest: "30-60 seconds", instructions: "Jump while spreading legs and raising arms, land softly", difficulty: "beginner" },
          { name: "Mountain Climbers", sets: 2, reps: "20-30", rest: "30-60 seconds", instructions: "Alternate knee drives in plank position, maintain steady rhythm", difficulty: "beginner" },
          { name: "High Knees", sets: 2, reps: "20-30", rest: "30-60 seconds", instructions: "Run in place lifting knees high, pump arms actively", difficulty: "beginner" },
          { name: "Step-Ups", sets: 2, reps: "10-15 each leg", rest: "30-60 seconds", instructions: "Step up onto platform with alternating legs, use handrail for balance", difficulty: "beginner" },
          { name: "Marching in Place", sets: 2, reps: "20-40", rest: "30-60 seconds", instructions: "March with high knees and arm swings, maintain good posture", difficulty: "beginner" },
          { name: "Low-Impact Aerobics", sets: 2, reps: "10-15 minutes", rest: "30-60 seconds", instructions: "Simple dance-like movements without jumping, focus on coordination", difficulty: "beginner" }
        ]},
        { muscleGroups: ["Full Body"], exercises: [
          { name: "Modified Burpees", sets: 2, reps: "5-10", rest: "45-75 seconds", instructions: "Step back instead of jumping, reduce intensity but maintain movement", difficulty: "beginner" },
          { name: "Jogging in Place", sets: 2, reps: "1-2 minutes", rest: "45-75 seconds", instructions: "Maintain steady jog with active arm movements", difficulty: "beginner" },
          { name: "Bodyweight Squats", sets: 2, reps: "15-25", rest: "45-75 seconds", instructions: "Stand with feet shoulder-width apart, lower body by bending knees and hips, keep chest up", difficulty: "beginner" },
          { name: "Modified Push-ups", sets: 2, reps: "5-10", rest: "45-75 seconds", instructions: "Perform push-ups on knees or against wall to reduce difficulty", difficulty: "beginner" },
          { name: "Planks", sets: 2, reps: "20-45 seconds", rest: "45-75 seconds", instructions: "Hold push-up position with core engaged, maintain straight line", difficulty: "beginner" },
          { name: "Wall Sits", sets: 2, reps: "30-60 seconds", rest: "45-75 seconds", instructions: "Slide down wall until thighs are parallel to floor, keep back flat", difficulty: "beginner" },
          { name: "Glute Bridges", sets: 2, reps: "15-20", rest: "45-75 seconds", instructions: "Lie on back, bend knees, lift hips by squeezing glutes and hamstrings", difficulty: "beginner" },
          { name: "Standing Side Leg Lifts", sets: 2, reps: "10-15 each side", rest: "45-75 seconds", instructions: "Stand upright, lift leg to side, engage hip abductors", difficulty: "beginner" }
        ]},
        { muscleGroups: ["Core Cardio"], exercises: [
          { name: "Plank Jacks", sets: 2, reps: "15-25", rest: "45-75 seconds", instructions: "Plank position with jumping feet, maintain stable core", difficulty: "beginner" },
          { name: "Russian Twists", sets: 2, reps: "20-30", rest: "45-75 seconds", instructions: "Sit and twist torso while leaning back, touch ground on each side", difficulty: "beginner" },
          { name: "Bicycle Crunches", sets: 2, reps: "20-30", rest: "45-75 seconds", instructions: "Alternate elbow to knee in cycling motion, engage obliques", difficulty: "beginner" },
          { name: "Bear Crawls", sets: 2, reps: "10-20", rest: "45-75 seconds", instructions: "Crawl on hands and feet like bear, engage core throughout", difficulty: "beginner" },
          { name: "Jump Rope (Beginner)", sets: 2, reps: "1-3 minutes", rest: "45-75 seconds", instructions: "Jump over rope in rhythmic pattern, focus on timing", difficulty: "beginner" },
          { name: "Standing Hip Circles", sets: 2, reps: "10 each direction", rest: "45-75 seconds", instructions: "Stand and rotate hips in circles, engage core", difficulty: "beginner" },
          { name: "Standing Torso Twists", sets: 2, reps: "20-30", rest: "45-75 seconds", instructions: "Stand with feet shoulder-width apart, twist torso left and right", difficulty: "beginner" },
          { name: "Standing Calf Raises", sets: 2, reps: "20-30", rest: "45-75 seconds", instructions: "Stand upright and raise heels while supporting body weight, lower slowly", difficulty: "beginner" }
        ]}
      ],
      intermediate: [
        { muscleGroups: ["Cardio", "Moderate Weights"], exercises: [
          { name: "Jogging", sets: 1, reps: "25-35 minutes", rest: "60-90 seconds", instructions: "Maintain challenging but sustainable pace with varied terrain", difficulty: "intermediate" },
          { name: "Kettlebell Swings", sets: 3, reps: "15-25", rest: "45-75 seconds", instructions: "Swing kettlebell with hip drive, maintain tight core", difficulty: "intermediate" },
          { name: "Box Jumps", sets: 3, reps: "10-15", rest: "45-75 seconds", instructions: "Jump onto box or platform, land softly with bent knees", difficulty: "intermediate" },
          { name: "Battle Ropes", sets: 3, reps: "30-45 seconds", rest: "45-75 seconds", instructions: "Create waves with heavy ropes, maintain continuous motion", difficulty: "intermediate" },
          { name: "Rowing Machine", sets: 3, reps: "500-800 meters", rest: "45-75 seconds", instructions: "Simulate rowing motion on machine with proper technique", difficulty: "intermediate" },
          { name: "Treadmill Intervals", sets: 3, reps: "2-3 minutes", rest: "45-75 seconds", instructions: "Alternating between moderate and higher speeds", difficulty: "intermediate" },
          { name: "Stationary Bike Intervals", sets: 3, reps: "3-4 minutes", rest: "45-75 seconds", instructions: "Alternating between moderate and high resistance", difficulty: "intermediate" },
          { name: "Elliptical Training", sets: 3, reps: "5-7 minutes", rest: "45-75 seconds", instructions: "Maintain steady rhythm with varying incline levels", difficulty: "intermediate" }
        ]},
        { muscleGroups: ["Full Body"], exercises: [
          { name: "Thrusters", sets: 3, reps: "8-12", rest: "45-75 seconds", instructions: "Squat to overhead press combination, maintain tight core", difficulty: "intermediate" },
          { name: "Clean and Press", sets: 3, reps: "6-8", rest: "45-75 seconds", instructions: "Lift weight from floor to overhead in two stages", difficulty: "intermediate" },
          { name: "Wall Balls", sets: 3, reps: "10-15", rest: "45-75 seconds", instructions: "Squat and throw ball against wall, catch and repeat", difficulty: "intermediate" },
          { name: "Box Jumps", sets: 3, reps: "8-12", rest: "45-75 seconds", instructions: "Jump onto box or platform, land softly with bent knees", difficulty: "intermediate" },
          { name: "Rowing Machine", sets: 3, reps: "500-800 meters", rest: "45-75 seconds", instructions: "Simulate rowing motion on machine with proper technique", difficulty: "intermediate" },
          { name: "Medicine Ball Slams", sets: 3, reps: "10-15", rest: "45-75 seconds", instructions: "Slam ball to ground with force, engage core", difficulty: "intermediate" },
          { name: "Jump Squats", sets: 3, reps: "10-15", rest: "45-75 seconds", instructions: "Squat with explosive jump, land softly with bent knees", difficulty: "intermediate" },
          { name: "Burpee to Broad Jump", sets: 3, reps: "6-10", rest: "45-75 seconds", instructions: "Complete burpee then explode into broad jump", difficulty: "intermediate" }
        ]},
        { muscleGroups: ["Core Cardio"], exercises: [
          { name: "Weighted Planks", sets: 3, reps: "30-60 seconds", rest: "45-75 seconds", instructions: "Hold with added weight on back, maintain straight line", difficulty: "intermediate" },
          { name: "Medicine Ball Slams", sets: 3, reps: "12-18", rest: "45-75 seconds", instructions: "Slam ball to ground with force, engage entire core", difficulty: "intermediate" },
          { name: "Mountain Climber Variations", sets: 3, reps: "20-30", rest: "45-75 seconds", instructions: "Increase speed and add variations like cross-body", difficulty: "intermediate" },
          { name: "Jump Rope", sets: 3, reps: "3-5 minutes", rest: "45-75 seconds", instructions: "Jump over rope in rhythmic pattern, maintain steady pace", difficulty: "intermediate" },
          { name: "Burpee Box Jumps", sets: 3, reps: "6-10", rest: "45-75 seconds", instructions: "Burpee followed by box jump, explosive movement", difficulty: "intermediate" },
          { name: "Side Plank with Leg Lifts", sets: 3, reps: "8-10 each side", rest: "45-75 seconds", instructions: "Hold side plank while lifting top leg, engage obliques", difficulty: "intermediate" },
          { name: "V-Ups", sets: 3, reps: "12-18", rest: "45-75 seconds", instructions: "Lie on back, simultaneously lift legs and torso to form V-shape", difficulty: "intermediate" },
          { name: "Flutter Kicks", sets: 3, reps: "20-30", rest: "45-75 seconds", instructions: "Lie on back, flutter legs up and down while maintaining core engagement", difficulty: "intermediate" }
        ]}
      ],
      advanced: [
        { muscleGroups: ["HIIT", "Heavy Weights"], exercises: [
          { name: "Sprint Intervals", sets: 4, reps: "30-45 seconds", rest: "30-45 seconds", instructions: "Alternating high-intensity sprints with active recovery", difficulty: "advanced" },
          { name: "Weighted Burpees", sets: 4, reps: "8-15", rest: "30-45 seconds", instructions: "Add weight vest or hold dumbbells, explosive movement", difficulty: "advanced" },
          { name: "Plyometric Lunges", sets: 4, reps: "8-12 each leg", rest: "30-45 seconds", instructions: "Explosive jump between legs, land softly", difficulty: "advanced" },
          { name: "Assault Bike", sets: 4, reps: "30-45 seconds", rest: "30-45 seconds", instructions: "High-intensity bike with moving handles, maintain continuous motion", difficulty: "advanced" },
          { name: "Sled Push/Pull", sets: 4, reps: "25-40 meters", rest: "30-45 seconds", instructions: "Push or pull weighted sled, maintain proper form", difficulty: "advanced" },
          { name: "Battle Ropes (Advanced)", sets: 4, reps: "45-60 seconds", rest: "30-45 seconds", instructions: "Create complex wave patterns with heavy ropes", difficulty: "advanced" },
          { name: "Rowing Sprints", sets: 4, reps: "30-45 seconds", rest: "30-45 seconds", instructions: "Maximum effort on rowing machine with proper form", difficulty: "advanced" },
          { name: "Box Step-ups (Weighted)", sets: 4, reps: "10-15 each leg", rest: "30-45 seconds", instructions: "Step up with dumbbells or weight vest, explosive movement", difficulty: "advanced" }
        ]},
        { muscleGroups: ["Metabolic"], exercises: [
          { name: "Clean and Jerk", sets: 4, reps: "4-6", rest: "30-60 seconds", instructions: "Explosive lift from floor to overhead, engage entire body", difficulty: "advanced" },
          { name: "Snatch", sets: 4, reps: "4-6", rest: "30-60 seconds", instructions: "Lift weight from floor to overhead in one motion", difficulty: "advanced" },
          { name: "Turkish Get-ups", sets: 4, reps: "4-6 each side", rest: "30-60 seconds", instructions: "Complex movement from lying to standing with weight overhead", difficulty: "advanced" },
          { name: "Double Unders", sets: 4, reps: "30-50", rest: "30-60 seconds", instructions: "Rope passes under feet twice per jump, maintain rhythm", difficulty: "advanced" },
          { name: "Kettlebell Snatch", sets: 4, reps: "6-10 each arm", rest: "30-60 seconds", instructions: "Explosive single-arm kettlebell lift, maintain tight core", difficulty: "advanced" },
          { name: "Goblet Squat to Press", sets: 4, reps: "8-12", rest: "30-60 seconds", instructions: "Squat holding weight at chest, press overhead at top", difficulty: "advanced" },
          { name: "Farmer's Walks", sets: 4, reps: "30-50 meters", rest: "30-60 seconds", instructions: "Walk while carrying heavy weights in each hand", difficulty: "advanced" },
          { name: "Kettlebell Swings (Heavy)", sets: 4, reps: "15-25", rest: "30-60 seconds", instructions: "Swing heavy kettlebell with powerful hip drive", difficulty: "advanced" }
        ]},
        { muscleGroups: ["Advanced Cardio"], exercises: [
          { name: "Tabata Training", sets: 8, reps: "20 seconds work, 10 seconds rest", rest: "30-60 seconds", instructions: "High-intensity interval protocol with maximum effort", difficulty: "advanced" },
          { name: "EMOM Workouts", sets: 10, reps: "variable", rest: "remaining minute", instructions: "Every minute on the minute, complete exercise then rest", difficulty: "advanced" },
          { name: "AMRAP Circuits", sets: 1, reps: "as many rounds as possible", rest: "none", instructions: "Maximize rounds in set time period, high intensity", difficulty: "advanced" },
          { name: "Rucking", sets: 1, reps: "40-60 minutes", rest: "none", instructions: "Walk with weighted backpack, maintain steady pace", difficulty: "advanced" },
          { name: "Metcon Circuits", sets: 5, reps: "30-45 seconds each", rest: "none", instructions: "Metabolic conditioning circuits with compound movements", difficulty: "advanced" },
          { name: "CrossFit WODs", sets: 1, reps: "for time", rest: "none", instructions: "High-intensity functional movements for time or rounds", difficulty: "advanced" },
          { name: "HIIT Pyramid", sets: 1, reps: "variable", rest: "none", instructions: "Increase and decrease intensity in pyramid fashion", difficulty: "advanced" },
          { name: "Endurance Complexes", sets: 3, reps: "8-12", rest: "none", instructions: "Multiple exercises performed in sequence without rest", difficulty: "advanced" }
        ]}
      ]
    },
    weight_loss: {
      // Similar structure for weight loss
      beginner: [
        { muscleGroups: ["HIIT", "Full Body"], exercises: [
          { name: "Bodyweight Circuits", sets: 2, reps: "10-20 each", rest: "30-60 seconds", instructions: "Quick succession of bodyweight moves", difficulty: "beginner" },
          { name: "Jump Squats", sets: 2, reps: "10-20", rest: "30-60 seconds", instructions: "Squat with explosive jump", difficulty: "beginner" },
          { name: "Push-up Variations", sets: 2, reps: "5-15", rest: "30-60 seconds", instructions: "Modify for your strength level", difficulty: "beginner" },
          { name: "Plank Holds", sets: 2, reps: "20-45 seconds", rest: "30-60 seconds", instructions: "Hold push-up position", difficulty: "beginner" },
          { name: "Marching in Place", sets: 2, reps: "20-40", rest: "30-60 seconds", instructions: "High knee marching", difficulty: "beginner" }
        ]},
        { muscleGroups: ["Fat Burning"], exercises: [
          { name: "High Knees", sets: 2, reps: "20-30", rest: "30-60 seconds", instructions: "Run in place lifting knees high", difficulty: "beginner" },
          { name: "Burpees", sets: 2, reps: "5-12", rest: "30-60 seconds", instructions: "Squat, jump, and clap above head", difficulty: "beginner" },
          { name: "Mountain Climbers", sets: 2, reps: "15-30", rest: "30-60 seconds", instructions: "Alternate knee drives in plank position", difficulty: "beginner" },
          { name: "Jumping Jacks", sets: 2, reps: "20-40", rest: "30-60 seconds", instructions: "Jump while spreading legs and raising arms", difficulty: "beginner" },
          { name: "Step-ups", sets: 2, reps: "10-20 each leg", rest: "30-60 seconds", instructions: "Use stairs or platform", difficulty: "beginner" }
        ]},
        { muscleGroups: ["Metabolic"], exercises: [
          { name: "Squats", sets: 2, reps: "15-30", rest: "30-60 seconds", instructions: "Lower body by bending knees and hips", difficulty: "beginner" },
          { name: "Lunges", sets: 2, reps: "8-15 each leg", rest: "30-60 seconds", instructions: "Step forward and lower hips", difficulty: "beginner" },
          { name: "Push-ups", sets: 2, reps: "5-15", rest: "30-60 seconds", instructions: "Keep your body straight and lower chest to ground", difficulty: "beginner" },
          { name: "Crunches", sets: 2, reps: "15-30", rest: "30-60 seconds", instructions: "Contract abs to raise shoulders", difficulty: "beginner" },
          { name: "Wall Sits", sets: 2, reps: "30-60 seconds", rest: "30-60 seconds", instructions: "Sit against wall with thighs horizontal", difficulty: "beginner" }
        ]}
      ],
      intermediate: [
        { muscleGroups: ["HIIT", "Full Body"], exercises: [
          { name: "Kettlebell Workouts", sets: 3, reps: "10-20", rest: "45-75 seconds", instructions: "Swings, squats, and presses", difficulty: "intermediate" },
          { name: "Battle Rope Circuits", sets: 3, reps: "30 seconds", rest: "45-75 seconds", instructions: "Create waves with heavy ropes", difficulty: "intermediate" },
          { name: "Box Jump Variations", sets: 3, reps: "8-15", rest: "45-75 seconds", instructions: "Jump onto box or platform", difficulty: "intermediate" },
          { name: "Medicine Ball Exercises", sets: 3, reps: "10-20", rest: "45-75 seconds", instructions: "Slams, throws, and catches", difficulty: "intermediate" },
          { name: "Circuit Training", sets: 3, reps: "45 seconds each", rest: "45-75 seconds", instructions: "Rotate through multiple exercises", difficulty: "intermediate" }
        ]},
        { muscleGroups: ["Fat Burning"], exercises: [
          { name: "Rowing Machine", sets: 3, reps: "500-1000 meters", rest: "45-75 seconds", instructions: "Simulate rowing motion on machine", difficulty: "intermediate" },
          { name: "Elliptical HIIT", sets: 3, reps: "30-60 seconds", rest: "45-75 seconds", instructions: "High-intensity intervals", difficulty: "intermediate" },
          { name: "Treadmill Sprints", sets: 3, reps: "30-60 seconds", rest: "45-75 seconds", instructions: "Alternating sprint and recovery", difficulty: "intermediate" },
          { name: "Cycling Intervals", sets: 3, reps: "30-60 seconds", rest: "45-75 seconds", instructions: "Alternating high and low resistance", difficulty: "intermediate" },
          { name: "Stairmaster", sets: 3, reps: "5-10 minutes", rest: "45-75 seconds", instructions: "Continuous stair climbing motion", difficulty: "intermediate" }
        ]},
        { muscleGroups: ["Metabolic"], exercises: [
          { name: "Thrusters", sets: 3, reps: "8-15", rest: "45-75 seconds", instructions: "Squat to overhead press combination", difficulty: "intermediate" },
          { name: "Wall Balls", sets: 3, reps: "10-20", rest: "45-75 seconds", instructions: "Squat and throw ball against wall", difficulty: "intermediate" },
          { name: "Burpee Box Jumps", sets: 3, reps: "6-12", rest: "45-75 seconds", instructions: "Burpee followed by box jump", difficulty: "intermediate" },
          { name: "Dumbbell Complexes", sets: 3, reps: "8-15", rest: "45-75 seconds", instructions: "Multiple moves with single dumbbell", difficulty: "intermediate" },
          { name: "Farmer's Walks", sets: 3, reps: "20-40 meters", rest: "45-75 seconds", instructions: "Walk while carrying heavy weights", difficulty: "intermediate" }
        ]}
      ],
      advanced: [
        { muscleGroups: ["Extreme HIIT"], exercises: [
          { name: "CrossFit Workouts", sets: 4, reps: "variable", rest: "30-60 seconds", instructions: "High-intensity functional movements", difficulty: "advanced" },
          { name: "Weighted Burpees", sets: 4, reps: "10-25", rest: "30-60 seconds", instructions: "Add weight vest or hold weights", difficulty: "advanced" },
          { name: "Plyometric Movements", sets: 4, reps: "10-20", rest: "30-60 seconds", instructions: "Explosive power movements", difficulty: "advanced" },
          { name: "Heavy Kettlebell Swings", sets: 4, reps: "15-30", rest: "30-60 seconds", instructions: "Swing heavy kettlebell with hip drive", difficulty: "advanced" },
          { name: "Boxer's Workout", sets: 4, reps: "3-5 rounds", rest: "30-60 seconds", instructions: "Combination of punches and cardio", difficulty: "advanced" }
        ]},
        { muscleGroups: ["Metabolic Conditioning"], exercises: [
          { name: "Olympic Lift Variations", sets: 4, reps: "3-6", rest: "30-60 seconds", instructions: "Clean, jerk, and snatch movements", difficulty: "advanced" },
          { name: "GPP Workouts", sets: 4, reps: "variable", rest: "30-60 seconds", instructions: "General physical preparedness", difficulty: "advanced" },
          { name: "Strongman Events", sets: 4, reps: "variable", rest: "30-60 seconds", instructions: "Tire flips, atlas stones, etc.", difficulty: "advanced" },
          { name: "Obstacle Course Training", sets: 4, reps: "course completion", rest: "30-60 seconds", instructions: "Navigate through obstacles", difficulty: "advanced" },
          { name: "Battle Ropes", sets: 4, reps: "30-60 seconds", rest: "30-60 seconds", instructions: "Create waves with heavy ropes", difficulty: "advanced" }
        ]},
        { muscleGroups: ["Advanced Fat Loss"], exercises: [
          { name: "EMOM Training", sets: 10, reps: "variable", rest: "remaining minute", instructions: "Every minute on the minute", difficulty: "advanced" },
          { name: "AMRAP Challenges", sets: 1, reps: "as many rounds as possible", rest: "none", instructions: "Maximize rounds in set time", difficulty: "advanced" },
          { name: "Chipper Workouts", sets: 1, reps: "all exercises", rest: "minimal", instructions: "Complete all exercises as fast as possible", difficulty: "advanced" },
          { name: "Hero WODs", sets: 1, reps: "for time", rest: "none", instructions: "Named after fallen heroes", difficulty: "advanced" },
          { name: "Murph Workout", sets: 1, reps: "1 mile run, 100 pull-ups, etc.", rest: "none", instructions: "Complete for time", difficulty: "advanced" }
        ]}
      ]
    }
  };

  // Get the appropriate template based on focus area and intensity
  const templates = workoutTemplates[focusArea]?.[intensity] || workoutTemplates.strength.beginner;
  
  // Create days of the week based on requested days per week
  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday", "Sunday"
  ].slice(0, daysPerWeek);
  
  // Create weekly schedule with the templates, adjusting exercises based on intensity and adding rest days
  const weeklySchedule = [];
  
  for (let i = 0; i < daysPerWeek; i++) {
    // Add rest day after every 2-3 intense workout days depending on intensity
    if (intensity === 'advanced' && weeklySchedule.length > 0) {
      // For advanced intensity, add a rest day after every 2-3 workout days
      const recentActiveDays = weeklySchedule.filter(d => d.type !== 'rest').length;
      if (recentActiveDays > 0 && recentActiveDays % 3 === 0 && weeklySchedule.length < daysPerWeek) {
        // Add a rest day after every 3 workout days
        weeklySchedule.push({
          day: daysOfWeek[weeklySchedule.length],
          focus: 'Rest Day',
          type: 'rest',
          duration: 'Rest',
          muscleGroups: [],
          warmUp: '',
          coolDown: '',
          exercises: []
        });
      }
    } else if (intensity === 'intermediate' && weeklySchedule.length > 0) {
      // For intermediate intensity, add a rest day after every 3-4 workout days
      const recentActiveDays = weeklySchedule.filter(d => d.type !== 'rest').length;
      if (recentActiveDays > 0 && recentActiveDays % 4 === 0 && weeklySchedule.length < daysPerWeek) {
        // Add a rest day after every 4 workout days
        weeklySchedule.push({
          day: daysOfWeek[weeklySchedule.length],
          focus: 'Rest Day',
          type: 'rest',
          duration: 'Rest',
          muscleGroups: [],
          warmUp: '',
          coolDown: '',
          exercises: []
        });
      }
    }
    
    // Add workout day if we haven't reached the required number of days yet
    if (weeklySchedule.length < daysPerWeek) {
      const dayTemplate = templates[i % templates.length];
      
      // Adjust number of exercises based on intensity and days per week
      let exercises = dayTemplate.exercises;
      if (intensity === 'beginner') {
        // For beginners: 3 exercises if less than 4 days/week, 2 exercises if 4+ days/week
        const maxExercises = daysPerWeek < 4 ? 3 : 2;
        exercises = dayTemplate.exercises.slice(0, maxExercises);
      } else if (intensity === 'intermediate') {
        // For intermediate: 4 exercises if less than 4 days/week, 3 exercises if 4+ days/week
        const maxExercises = daysPerWeek < 4 ? 4 : 3;
        exercises = dayTemplate.exercises.slice(0, maxExercises);
      } else if (intensity === 'advanced') {
        // For advanced: 5 exercises if less than 4 days/week, 4 exercises if 4+ days/week
        const maxExercises = daysPerWeek < 4 ? 5 : 4;
        exercises = dayTemplate.exercises.slice(0, maxExercises);
      }
      
      // Create the workout day object
      weeklySchedule.push({
        day: daysOfWeek[weeklySchedule.length],
        focus: dayTemplate.muscleGroups.join(' & '),
        type: 'workout',
        duration: '45-60 minutes',
        muscleGroups: dayTemplate.muscleGroups,
        warmUp: '5-10 minutes dynamic stretching',
        coolDown: '5-10 minutes static stretching',
        exercises: exercises
      });
    }
  }
  
  // Format exercises properly for the frontend
  const formattedSchedule = formatExercisesForFrontend(weeklySchedule);
  
  // Return the completed weekly schedule
  return {
    schedule: formattedSchedule,
    focusArea: focusArea,
    intensity: intensity,
    daysPerWeek: daysPerWeek
  };
}

// Helper function to format exercises properly for the frontend
const formatExercisesForFrontend = (schedule) => {
  return schedule.map(day => {
    // Format exercises to ensure proper naming
    const formattedExercises = day.exercises.map(exercise => {
      // Ensure exercise name is properly formatted and not a generic muscle group
      let formattedName = exercise.name;
      
      // If the exercise name is just a generic muscle group, provide a more specific exercise name
      if (typeof formattedName === 'string' && 
          (formattedName.toLowerCase().includes('chest & triceps') || 
           formattedName.toLowerCase().includes('back & biceps') ||
           formattedName.toLowerCase().includes('legs') ||
           formattedName.toLowerCase().includes('shoulders & abs') ||
           formattedName.toLowerCase().includes('full body') ||
           formattedName.toLowerCase().includes('core'))) {
        // Provide a more specific exercise based on the muscle group
        if (formattedName.toLowerCase().includes('chest')) {
          formattedName = 'Bench Press';
        } else if (formattedName.toLowerCase().includes('back')) {
          formattedName = 'Pull-ups';
        } else if (formattedName.toLowerCase().includes('legs')) {
          formattedName = 'Squats';
        } else if (formattedName.toLowerCase().includes('shoulders')) {
          formattedName = 'Shoulder Press';
        } else if (formattedName.toLowerCase().includes('abs') || formattedName.toLowerCase().includes('core')) {
          formattedName = 'Planks';
        } else {
          formattedName = 'Compound Exercise';
        }
      }
      
      // Format the details string
      const details = `${exercise.sets || 3} sets of ${exercise.reps || '8-12'} reps`; // More professional format
      
      return {
        name: formattedName,
        details: details,
        sets: exercise.sets,
        reps: exercise.reps,
        rest: exercise.rest,
        instructions: exercise.instructions || '',
        difficulty: exercise.difficulty || ''
      };
    });
    
    return {
      ...day,
      exercises: formattedExercises
    };
  });
};

// Import the database connection
const db = require('../config/database');
const { generateWorkoutPlanWithAI } = require('../services/aiService');

// Function to generate a new workout plan
const generateWorkoutPlan = async (req, res) => {
  try {
    const { intensity, daysPerWeek, focusArea } = req.body;
    const userId = req.user.id; // Assuming user ID comes from auth middleware
    
    // First, try to generate a plan using AI
    let workoutPlan;
    let usedFallback = false;
    
    try {
      workoutPlan = await generateWorkoutPlanWithAI({ intensity, daysPerWeek, focusArea });
    } catch (aiError) {
      console.warn('AI generation failed, using fallback:', aiError.message);
      // If AI fails, use the fallback
      workoutPlan = createFallbackWorkoutPlan(intensity, daysPerWeek, focusArea);
      usedFallback = true;
    }
    
    // Save the workout plan to the database
    const insertQuery = `INSERT INTO workout_plans (user_id, intensity, days_per_week, focus_area, plan_data, created_at) VALUES (?, ?, ?, ?, ?, NOW())`;
    const result = await db.execute(insertQuery, [
      userId,
      intensity,
      daysPerWeek,
      focusArea,
      JSON.stringify(workoutPlan)
    ]);
    
    // Return the generated plan
    res.json({
      success: true,
      data: {
        plan: workoutPlan,
        planId: result.insertId,
        usedFallback: usedFallback
      }
    });
  } catch (error) {
    console.error('Error generating workout plan:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating workout plan'
    });
  }
};

// Function to get the current workout plan for a user
const getCurrentPlan = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID comes from auth middleware
    
    // Get the most recent workout plan for the user
    const query = `SELECT * FROM workout_plans WHERE user_id = ? ORDER BY created_at DESC LIMIT 1`;
    const [rows] = await db.execute(query, [userId]);
    
    if (rows.length > 0) {
      const plan = rows[0];
      plan.plan_data = JSON.parse(plan.plan_data);
      
      res.json({
        success: true,
        data: {
          plan: plan.plan_data,
          planId: plan.id,
          createdAt: plan.created_at
        }
      });
    } else {
      // If no plan exists, return an empty response
      res.json({
        success: true,
        data: {
          plan: null
        }
      });
    }
  } catch (error) {
    console.error('Error fetching current workout plan:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching workout plan'
    });
  }
};

module.exports = {
  generateWorkoutPlan,
  getCurrentPlan,
  createFallbackWorkoutPlan,
  formatExercisesForFrontend
};