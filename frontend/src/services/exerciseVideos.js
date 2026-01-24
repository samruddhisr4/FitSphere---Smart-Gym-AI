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

  // Arm Exercises - Added missing variations
  "Barbell Curl": "https://www.youtube.com/watch?v=kwG2ipFRgfo",
  "Bicep Curls": "https://www.youtube.com/watch?v=kwG2ipFRgfo", // Added for plural form
  "Bicep Curl": "https://www.youtube.com/watch?v=kwG2ipFRgfo", // Added singular form
  "Dumbbell Curl": "https://www.youtube.com/watch?v=kwG2ipFRgfo",
  "EZ Bar Curl": "https://www.youtube.com/watch?v=kwG2ipFRgfo",
  "Hammer Curl": "https://www.youtube.com/watch?v=TwD-YGVP4Bk",
  "Preacher Curl": "https://www.youtube.com/watch?v=fIWP-FRFNU0",
  "Concentration Curl": "https://www.youtube.com/watch?v=Jvj2wV0vOYU",
  "Cable Curl": "https://www.youtube.com/watch?v=ECye-pixi7E",
  
  "Tricep Dip": "https://www.youtube.com/watch?v=tKgDUc8qrIE",
  "Tricep Dips": "https://www.youtube.com/watch?v=tKgDUc8qrIE", // Added plural form
  "Triceps Dip": "https://www.youtube.com/watch?v=tKgDUc8qrIE", // Added alternative form
  "Triceps Dips": "https://www.youtube.com/watch?v=tKgDUc8qrIE", // Added alternative plural form
  "Skull Crusher": "https://www.youtube.com/watch?v=dBkAEE5-HY0",
  "Overhead Tricep Extension": "https://www.youtube.com/watch?v=-Vyt2QdsR7E",
  "Cable Tricep Pushdown": "https://www.youtube.com/watch?v=2-LAMcpzODU",

  // Core Exercises
  Plank: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
  "Hanging Leg Raise": "https://www.youtube.com/watch?v=JB2oyawG9KI",
  Crunch: "https://www.youtube.com/watch?v=Xyd_fa5zoEU",
  "Russian Twist": "https://www.youtube.com/watch?v=wkD8rjkodUI",
  "Mountain Climbers": "https://www.youtube.com/watch?v=nmwgirgXLYM",
  
  // Additional common exercises for better coverage
  "Close Grip Bench Press": "https://www.youtube.com/watch?v=GM16t3ua94A",
  "Diamond Push-Up": "https://www.youtube.com/watch?v=J0Dn32Vs3Q8",
  "Incline Bench Press": "https://www.youtube.com/watch?v=SrqOu55lrYU",
  "Decline Bench Press": "https://www.youtube.com/watch?v=LfyQBUKR8SE",
  "Cable Fly": "https://www.youtube.com/watch?v=eozdVDA78K0",
  "Dumbbell Fly": "https://www.youtube.com/watch?v=eozdVDA78K0",
  "Face Pull": "https://www.youtube.com/watch?v=V8dZ32Vs3Q8",
  "Shrug": "https://www.youtube.com/watch?v=zdJ8N2GwRuY",
  "Upright Row": "https://www.youtube.com/watch?v=amCU-ziHITM",
  "Military Press": "https://www.youtube.com/watch?v=2yjwXTZQDDI",
  "Arnold Press": "https://www.youtube.com/watch?v=6Z15_WdXmVw",
  "Bulgarian Split Squat": "https://www.youtube.com/watch?v=2C-uNgKwPLE",
  "Step Up": "https://www.youtube.com/watch?v=dQqApCGd5Ss",
  "Hip Thrust": "https://www.youtube.com/watch?v=SEdqd1n0cvg",
  "Glute Bridge": "https://www.youtube.com/watch?v=OUgsJ8-Vi0E",
  "Calf Raise": "https://www.youtube.com/watch?v=-M4-G8p8fmc",
  "Donkey Calf Raise": "https://www.youtube.com/watch?v=3WBGAtdJ5ZY",
  "Seated Calf Raise": "https://www.youtube.com/watch?v=JbyjNymZOd0",
  "Leg Curl": "https://www.youtube.com/watch?v=ELOCsoqjJj8",
  "Leg Extension": "https://www.youtube.com/watch?v=YyvSfVjQeL0",
  "Side Lateral Raise": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
  "Front Delt Raise": "https://www.youtube.com/watch?v=-t7fuZ0KhDA",
  "Rear Delt Raise": "https://www.youtube.com/watch?v=QSrnX_LE78Y",
  "Cable Lateral Raise": "https://www.youtube.com/watch?v=V8dZ32Vs3Q8",
  "Machine Lateral Raise": "https://www.youtube.com/watch?v=V8dZ32Vs3Q8",
  "Machine Shoulder Press": "https://www.youtube.com/watch?v=qEwKCR5JCog",
  "Machine Chest Press": "https://www.youtube.com/watch?v=rT7DgCr-3pg",
  "Machine Row": "https://www.youtube.com/watch?v=xQNrFHEMhI4",
  "Machine Lat Pulldown": "https://www.youtube.com/watch?v=CAwf7n6Luuc",
  "Machine Leg Press": "https://www.youtube.com/watch?v=IZxyjW7MPJQ",
  "Smith Machine Squat": "https://www.youtube.com/watch?v=YaXPRqUwItQ",
  "Hack Squat": "https://www.youtube.com/watch?v=0tn5KkZvEXE",
  "Leg Press Machine": "https://www.youtube.com/watch?v=IZxyjW7MPJQ",
  "Ab Crunch Machine": "https://www.youtube.com/watch?v=Xyd_fa5zoEU",
  "Cable Crunch": "https://www.youtube.com/watch?v=Xyd_fa5zoEU",
  "Hanging Knee Raise": "https://www.youtube.com/watch?v=JB2oyawG9KI",
  "Sit Up": "https://www.youtube.com/watch?v=Xyd_fa5zoEU",
  "V Up": "https://www.youtube.com/watch?v=9FGilxCbdz8",
  "Bicycle Crunch": "https://www.youtube.com/watch?v=9FGilxCbdz8",
  "Flutter Kick": "https://www.youtube.com/watch?v=9FGilxCbdz8",
  "Plank Jack": "https://www.youtube.com/watch?v=nmwgirgXLYM",
  "Burpee": "https://www.youtube.com/watch?v=TU8QYVW0gDU",
  "Jump Squat": "https://www.youtube.com/watch?v=CVaEhXotL7M",
  "Box Jump": "https://www.youtube.com/watch?v=U4sAlj8jVws",
  "Jump Lunge": "https://www.youtube.com/watch?v=QE7wSQIXH6k",
  "Wall Sit": "https://www.youtube.com/watch?v=QiMOsMkZbq0",
  "Single Leg Glute Bridge": "https://www.youtube.com/watch?v=OUgsJ8-Vi0E",
  "Clamshell": "https://www.youtube.com/watch?v=IpLy4Hc6Y5M",
  "Fire Hydrant": "https://www.youtube.com/watch?v=3XDriUn0udo",
  "Side Plank": "https://www.youtube.com/watch?v=K2VljzCC16g",
  "Bird Dog": "https://www.youtube.com/watch?v=wiFNA3sqjCA",
  "Superman": "https://www.youtube.com/watch?v=cc6UVRS7PW4",
  "Dead Bug": "https://www.youtube.com/watch?v=2MdnSrFrks0"
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