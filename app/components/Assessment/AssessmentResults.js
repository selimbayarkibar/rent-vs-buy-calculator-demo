"use client";

export default function AssessmentResults({ results, founderName }) {
  if (!results) return null;

  const categories = [
    { id: "pitchStorytelling", name: "Pitch & Storytelling", icon: "💬" },
    { id: "credibilityTrust", name: "Credibility & Trust", icon: "✅" },
    { id: "marketUnderstanding", name: "Market Understanding", icon: "🎯" },
    { id: "investorRelations", name: "Investor Relations", icon: "👥" },
    { id: "persistence", name: "Fundraising Persistence", icon: "⚡" },
    { id: "coachability", name: "Coachability & Learning", icon: "🎓" },
  ];

  const getProgressBarColor = (score) => {
    if (score >= 80) return "bg-violate-100";
    if (score >= 60) return "bg-violate-100";
    if (score >= 40) return "bg-violate-100";
    return "bg-violate-100";
  };

  const getOverallLevel = (score) => {
    if (score >= 85) return "Exceptional Fundraiser - High Success Rate";
    if (score >= 70) return "Strong Fundraiser - Good Success Rate";
    if (score >= 55) return "Developing Fundraiser - Moderate Success Rate";
    if (score >= 40) return "Emerging Fundraiser - Limited Success Rate";
    return "Beginner Fundraiser - Low Success Rate";
  };

  return (
    <div className="bg-white rounded-lg p-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-violate-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="text-white text-2xl">📈</div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Assessment Results
        </h2>
        <p className="text-gray-600 mb-4">
          {founderName ? `${founderName}'s comprehensive` : "Comprehensive"}{" "}
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
                className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(
                  results.categoryScores[category.id]
                )}`}
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

      {/* <div className="flex justify-center space-x-4">
        <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors hover:cursor-pointer">
          New Assessment
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover:cursor-pointer">
          Export Results
        </button>
      </div> */}
    </div>
  );
}
