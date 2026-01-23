import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { workoutService } from "../services/api";

const FormChecker = () => {
  const webcamRef = useRef(null);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [currentExercise, setCurrentExercise] = useState("bench-press");
  const [loading, setLoading] = useState(false);
  const [previousAnalyses, setPreviousAnalyses] = useState([]);

  const capturePhoto = async () => {
    setLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();

    try {
      // Send the captured image to backend for AI analysis
      const formData = {
        image: imageSrc,
        exercise: currentExercise,
      };

      const response = await workoutService.submitFormAnalysis(formData);

      if (response.success) {
        setAnalysisResults(response.data.analysis);
        // Add to previous analyses
        setPreviousAnalyses((prev) => [
          {
            id: Date.now(),
            date: new Date().toISOString().split("T")[0],
            exercise: currentExercise,
            score: response.data.score,
            status: response.data.status,
          },
          ...prev.slice(0, 4), // Keep only last 5 analyses
        ]);
      } else {
        console.error("Analysis failed:", response.message);
      }
    } catch (error) {
      console.error("Error during form analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Form Checker</h1>
        <p className="text-gray-400">
          Use your camera to get real-time form feedback
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Feed */}
        <div className="bg-dark-700 p-6 rounded-lg shadow border border-dark-600">
          <h2 className="text-xl font-semibold text-white mb-4">Live Camera</h2>

          <div
            className="relative bg-dark-600 rounded-lg overflow-hidden border border-dark-500"
            style={{ paddingBottom: "75%" }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="mt-4 flex space-x-4">
            <button
              onClick={capturePhoto}
              className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Capture & Analyze"}
            </button>
            <button className="flex-1 bg-dark-600 hover:bg-dark-500 text-white py-3 rounded-lg font-medium border border-dark-500">
              Start Session
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="space-y-6">
          <div className="bg-dark-700 p-6 rounded-lg shadow border border-dark-600">
            <h2 className="text-xl font-semibold text-white mb-4">
              Current Exercise
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Exercise
              </label>
              <select
                value={currentExercise}
                onChange={(e) => setCurrentExercise(e.target.value)}
                className="w-full p-3 border border-dark-600 rounded-lg bg-dark-600 text-white focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="bench-press" className="bg-dark-700 text-white">
                  Bench Press
                </option>
                <option value="squat" className="bg-dark-700 text-white">
                  Squat
                </option>
                <option value="deadlift" className="bg-dark-700 text-white">
                  Deadlift
                </option>
                <option
                  value="overhead-press"
                  className="bg-dark-700 text-white"
                >
                  Overhead Press
                </option>
                <option value="pullup" className="bg-dark-700 text-white">
                  Pull-up
                </option>
                <option value="pushup" className="bg-dark-700 text-white">
                  Push-up
                </option>
              </select>
            </div>

            <div className="space-y-3">
              {analysisResults.length > 0 ? (
                analysisResults.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-lg ${
                      item.status === "excellent"
                        ? "bg-green-500/10 border border-green-500/30"
                        : item.status === "good"
                        ? "bg-blue-500/10 border border-blue-500/30"
                        : item.status === "needs_adjustment"
                        ? "bg-yellow-500/10 border border-yellow-500/30"
                        : "bg-red-500/10 border border-red-500/30"
                    }`}
                  >
                    <span className="font-medium text-white">
                      {item.aspect}
                    </span>
                    <span
                      className={`font-medium ${
                        item.status === "excellent"
                          ? "text-green-400"
                          : item.status === "good"
                          ? "text-blue-400"
                          : item.status === "needs_adjustment"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.status.replace("_", " ")}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-400">
                  {loading
                    ? "Analyzing form..."
                    : "Capture an image to analyze your form"}
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-dark-700 p-6 rounded-lg shadow border border-dark-600">
            <h2 className="text-xl font-semibold text-white mb-4">Form Tips</h2>

            <div className="space-y-4">
              <div className="p-4 bg-dark-600 rounded-lg border border-dark-500">
                <h3 className="font-medium text-white">Bench Press Tips</h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Keep feet flat on floor</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Retract shoulder blades</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">⚠</span>
                    <span>Lower bar to mid-chest level</span>
                  </li>
                </ul>
              </div>

              <button className="w-full bg-secondary-500 hover:bg-secondary-600 text-white py-3 rounded-lg font-medium">
                Save Form Feedback
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Analyses */}
      <div className="bg-dark-700 p-6 rounded-lg shadow border border-dark-600">
        <h2 className="text-xl font-semibold text-white mb-4">
          Previous Analyses
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-dark-600">
            <thead className="bg-dark-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Exercise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-600">
              {previousAnalyses.length > 0 ? (
                previousAnalyses.map((analysis) => (
                  <tr key={analysis.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {analysis.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {analysis.exercise.replace("-", " ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {analysis.score}/10
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          analysis.status === "excellent"
                            ? "bg-green-500/20 text-green-400"
                            : analysis.status === "good"
                            ? "bg-blue-500/20 text-blue-400"
                            : analysis.status === "needs_work"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {analysis.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-sm text-gray-400"
                  >
                    No previous analyses yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormChecker;
