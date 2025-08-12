"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import assessmentQuestions from "@/data/assessment/assessmentQuestions.json";

// Start Screen Component
const StartScreen = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violate-500 via-violate-100 to-violate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center">
          <div className="w-20 h-20 bg-violate-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-white text-3xl">📈</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Fundraising Readiness Assessment
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Evaluate the intangible skills that determine fundraising success.
            Assess the founder&apos;s ability to raise capital.
          </p>
          <p className="text-gray-700 mb-8">
            This assessment focuses on the critical interpersonal skills and
            intangibles that drive fundraising success:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-sm">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="">💬</span>
            <span className="font-medium">Pitch & Storytelling</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="">✅</span>
            <span className="font-medium">Credibility & Trust</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="">🎯</span>
            <span className="font-medium">Market Understanding</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="">👥</span>
            <span className="font-medium">Investor Relations</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="">⚡</span>
            <span className="font-medium">Fundraising Persistence</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="">🎓</span>
            <span className="font-medium">Coachability & Learning</span>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 px-6 bg-violate-500 text-white text-lg font-semibold rounded-lg hover:bg-violate-800 hover:cursor-pointer transition-colors"
        >
          Start Assessment
        </button>
      </div>
    </div>
  );
};

// Question Screen Component
const QuestionScreen = ({
  question,
  questionIndex,
  totalQuestions,
  selectedValue,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  progress,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violate-500 via-violate-100 to-violate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-violate-500 text-sm font-medium">
              {progress}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-violate-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-gray-600 font-medium">
              {question.category}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option) => (
            <div
              key={option.value}
              className={`block cursor-pointer border-2 rounded-lg p-4 transition-all hover:shadow-md ${
                selectedValue === option.value
                  ? "border-violate-500 bg-violate-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onAnswer(option.value)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Custom Radio Button */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedValue === option.value
                        ? "border-violate-500 bg-white"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedValue === option.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-violate-500"></div>
                    )}
                  </div>
                  <span className="text-gray-900 font-medium">
                    {option.label}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedValue === option.value
                      ? "bg-violate-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {option.value}/5
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={onPrevious}
            disabled={questionIndex === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              questionIndex === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              canGoNext
                ? "bg-violate-500 text-white hover:bg-violate-800 hover:cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <span>
              {questionIndex === totalQuestions - 1 ? "Complete" : "Next"}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Results Screen Component
const ResultsScreen = ({ results, founderName, onNewAssessment }) => {
  if (!results) return null;

  const categories = [
    { id: "pitchStorytelling", name: "Pitch & Storytelling", icon: "💬" },
    { id: "credibilityTrust", name: "Credibility & Trust", icon: "✅" },
    { id: "marketUnderstanding", name: "Market Understanding", icon: "🎯" },
    { id: "investorRelations", name: "Investor Relations", icon: "👥" },
    { id: "persistence", name: "Fundraising Persistence", icon: "⚡" },
    { id: "coachability", name: "Coachability & Learning", icon: "🎓" },
  ];

  const getOverallLevel = (score) => {
    if (score >= 85) return "Exceptional Fundraiser - High Success Rate";
    if (score >= 70) return "Strong Fundraiser - Good Success Rate";
    if (score >= 55) return "Developing Fundraiser - Moderate Success Rate";
    if (score >= 40) return "Emerging Fundraiser - Limited Success Rate";
    return "Beginner Fundraiser - Low Success Rate";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violate-500 via-violate-100 to-violate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-violate-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-white text-3xl">📈</div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Assessment Results
          </h2>
          <p className="text-gray-600 mb-6">
            {founderName
              ? `${founderName}&apos;s comprehensive`
              : "Comprehensive"}{" "}
            founder evaluation completed
          </p>

          <div className="text-6xl font-bold text-violate-500 mb-2">
            {results.overallScore}%
          </div>
          <div className="text-xl font-semibold text-gray-700 mb-6">
            {getOverallLevel(results.overallScore)}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium text-sm text-gray-700">
                  {category.name}
                </span>
              </div>
              <div className="text-2xl font-bold text-violate-500 mb-2">
                {results.categoryScores[category.id]}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-violate-100 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${results.categoryScores[category.id]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
          <div className="space-y-2">
            {results.insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={onNewAssessment}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:cursor-pointer transition-colors font-medium"
          >
            New Assessment
          </button>
          <button className="px-6 py-3 bg-violate-500 text-white rounded-lg hover:cursor-pointer hover:bg-violate-800 transition-colors font-medium">
            Export Results
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Form Component
export default function MpAssessmentForm({
  values,
  onChange,
  onComplete,
  onReset,
  results,
}) {
  const [currentScreen, setCurrentScreen] = useState("start"); // 'start', 'questions', 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleStart = () => {
    setCurrentScreen("questions");
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (value) => {
    const question = assessmentQuestions[currentQuestionIndex];
    onChange({ ...values, [question.id]: value });
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Complete assessment
      onComplete();
      setCurrentScreen("results");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNewAssessment = () => {
    setCurrentScreen("start");
    setCurrentQuestionIndex(0);
    onReset();
  };

  // Show results if they exist
  if (results && currentScreen === "questions") {
    setCurrentScreen("results");
  }

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const selectedValue = values[currentQuestion?.id];
  const canGoNext = selectedValue !== undefined && selectedValue !== null;
  const progress = Math.round(
    ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100
  );

  if (currentScreen === "start") {
    return <StartScreen onStart={handleStart} />;
  }

  if (currentScreen === "questions") {
    return (
      <QuestionScreen
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={assessmentQuestions.length}
        selectedValue={selectedValue}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={canGoNext}
        progress={progress}
      />
    );
  }

  if (currentScreen === "results") {
    return (
      <ResultsScreen
        results={results}
        founderName={values.founderName}
        onNewAssessment={handleNewAssessment}
      />
    );
  }

  return null;
}
