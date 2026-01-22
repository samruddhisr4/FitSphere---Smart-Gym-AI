// API service for communicating with the backend
const API_BASE_URL = "http://localhost:5000/api";

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Set up default headers
const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// Authentication API calls
export const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (data.success) {
        // Store the token in localStorage
        localStorage.setItem("token", data.data.token);
      }
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (data.success) {
        // Store the token in localStorage
        localStorage.setItem("token", data.data.token);
      }
      return data;
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Profile fetch error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token");
  },
};

// Workout API calls
export const workoutService = {
  // Get current workout plan
  getCurrentPlan: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/current`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Workout plan fetch error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  // Submit form analysis
  submitFormAnalysis: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/form-analysis`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Form analysis submission error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  // Generate new workout plan
  generateWorkoutPlan: async (planData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/generate`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(planData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Workout plan generation error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },
};

// Progress API calls
export const progressService = {
  // Get user progress
  getUserProgress: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/progress`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Progress fetch error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  // Get user achievements
  getUserAchievements: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/achievements`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Achievements fetch error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },
};

// Settings API calls
export const settingsService = {
  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/update`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Profile update error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },
};
