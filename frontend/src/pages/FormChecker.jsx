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
        <h1 className="text-2xl font-bold text-gray-800">Form Checker</h1>
        <p className="text-gray-600">
          Use your camera to get real-time form feedback
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Feed */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Live Camera
          </h2>

          <div
            className="relative bg-gray-200 rounded-lg overflow-hidden"
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
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium"
            >
              Capture & Analyze
            </button>
            <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium">
              Start Session
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Current Exercise
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Exercise
              </label>
              <select
                value={currentExercise}
                onChange={(e) => setCurrentExercise(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="bench-press">Bench Press</option>
                <option value="squat">Squat</option>
                <option value="deadlift">Deadlift</option>
                <option value="overhead-press">Overhead Press</option>
                <option value="pullup">Pull-up</option>
                <option value="pushup">Push-up</option>
              </select>
            </div>

            <div className="space-y-3">
              {analysisResults.length > 0 ? (
                analysisResults.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-lg ${
                      item.status === "excellent"
                        ? "bg-green-50"
                        : item.status === "good"
                        ? "bg-blue-50"
                        : item.status === "needs_adjustment"
                        ? "bg-yellow-50"
                        : "bg-red-50"
                    }`}
                  >
                    <span className="font-medium">{item.aspect}</span>
                    <span
                      className={`font-medium ${
                        item.status === "excellent"
                          ? "text-green-600"
                          : item.status === "good"
                          ? "text-blue-600"
                          : item.status === "needs_adjustment"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.status.replace("_", " ")}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  {loading
                    ? "Analyzing form..."
                    : "Capture an image to analyze your form"}
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Form Tips
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-800">Bench Press Tips</h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Keep feet flat on floor</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Retract shoulder blades</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">⚠</span>
                    <span>Lower bar to mid-chest level</span>
                  </li>
                </ul>
              </div>

              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium">
                Save Form Feedback
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Analyses */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Previous Analyses
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exercise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {previousAnalyses.length > 0 ? (
                previousAnalyses.map((analysis) => (
                  <tr key={analysis.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {analysis.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {analysis.exercise.replace("-", " ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {analysis.score}/10
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          analysis.status === "excellent"
                            ? "bg-green-100 text-green-800"
                            : analysis.status === "good"
                            ? "bg-blue-100 text-blue-800"
                            : analysis.status === "needs_work"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
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
                    className="px-6 py-4 text-center text-sm text-gray-500"
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
