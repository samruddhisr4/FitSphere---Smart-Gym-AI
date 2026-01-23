// Exercise video mapping service
// Maps exercise names to YouTube video IDs for demonstration purposes
// In a production app, you'd integrate with a proper exercise video API

const exerciseVideoMap = {
  // Chest Exercises
  "Bench Press": "https://www.youtube.com/watch?v=rT7DgCr-3pg",
  "Push-Ups": "https://www.youtube.com/watch?v=IODxDxX7oi4",
  "Incline Dumbbell Press": "https://www.youtube.com/watch?v=8nNi8gsbIsg",
  "Dumbbell Bench Press": "https://www.youtube.com/watch?v=VmB1G1K7v94",
  "Chest Flyes": "https://www.youtube.com/watch?v=eozdVDA78K0",

  // Back Exercises
  "Pull-Ups": "https://www.youtube.com/watch?v=eGo4IYlbE5g",
  "Lat Pulldown": "https://www.youtube.com/watch?v=CAwf7n6Luuc",
  "Barbell Row": "https://www.youtube.com/watch?v=roCP6wCXPqo",
  "Seated Cable Row": "https://www.youtube.com/watch?v=xQNrFHEMhI4",
  "T-Bar Row": "https://www.youtube.com/watch?v=j3Igk5nyZE4",

  // Leg Exercises
  Squat: "https://www.youtube.com/watch?v=YaXPRqUwItQ",
  Deadlift: "https://www.youtube.com/watch?v=op9kVnSso6Q",
  "Romanian Deadlift": "https://www.youtube.com/watch?v=3VXmecChYYM",
  Lunge: "https://www.youtube.com/watch?v=QE7wSQIXH6k",
  "Leg Press": "https://www.youtube.com/watch?v=IZxyjW7MPJQ",
  "Standing Calf Raise": "https://www.youtube.com/watch?v=-M4-G8p8fmc",

  // Shoulder Exercises
  "Overhead Press": "https://www.youtube.com/watch?v=2yjwXTZQDDI",
  "Dumbbell Shoulder Press": "https://www.youtube.com/watch?v=qEwKCR5JCog",
  "Lateral Raise": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
  "Front Raise": "https://www.youtube.com/watch?v=-t7fuZ0KhDA",
  "Rear Delt Fly": "https://www.youtube.com/watch?v=QSrnX_LE78Y",

  // Arm Exercises
  "Barbell Curl": "https://www.youtube.com/watch?v=kwG2ipFRgfo",
  "Hammer Curl": "https://www.youtube.com/watch?v=TwD-YGVP4Bk",
  "Preacher Curl": "https://www.youtube.com/watch?v=fIWP-FRFNU0",
  "Tricep Dip": "https://www.youtube.com/watch?v=tKgDUc8qrIE",
  "Skull Crusher": "https://www.youtube.com/watch?v=dBkAEE5-HY0",

  // Core Exercises
  Plank: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
  "Hanging Leg Raise": "https://www.youtube.com/watch?v=JB2oyawG9KI",
  Crunch: "https://www.youtube.com/watch?v=Xyd_fa5zoEU",
  "Russian Twist": "https://www.youtube.com/watch?v=wkD8rjkodUI",
  "Mountain Climbers": "https://www.youtube.com/watch?v=nmwgirgXLYM",
  // Cardio Exercises
  Burpee: "https://www.youtube.com/watch?v=TU8QYVW0gDU",
  "Jumping Jack": "https://www.youtube.com/watch?v=Kb1f4g1J6ik",
  "High Knees": "https://www.youtube.com/watch?v=OAJ_J3EZkdY",
  "Jump Rope": "https://www.youtube.com/watch?v=1BZM2Vre5oc",
  "Box Jump": "https://www.youtube.com/watch?v=U4sAlj8jVws",
};

// Function to get video URL for an exercise
export const getExerciseVideoUrl = (exerciseName) => {
  // Try exact match first
  if (exerciseVideoMap[exerciseName]) {
    return exerciseVideoMap[exerciseName];
  }

  // Try partial match (case insensitive)
  const normalizedExerciseName = exerciseName.toLowerCase();
  for (const [key, url] of Object.entries(exerciseVideoMap)) {
    if (
      normalizedExerciseName.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(normalizedExerciseName)
    ) {
      return url;
    }
  }

  // Return a general fitness video if no specific match found
  return (
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(exerciseName + " exercise tutorial")
  );
};

// Function to get embedded video URL
export const getEmbeddedVideoUrl = (exerciseName) => {
  const fullUrl = getExerciseVideoUrl(exerciseName);
  if (fullUrl.includes("youtube.com/watch")) {
    const videoId = fullUrl.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return fullUrl; // Return the original URL if it's not a YouTube watch URL
};

export default exerciseVideoMap;
