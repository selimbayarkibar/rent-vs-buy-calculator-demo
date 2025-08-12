"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import assessmentQuestions from "@/data/assessment/assessmentQuestions.json";

export default function AssessmentForm({ values, onChange, onCalculate }) {
  const handleChange = (field, value) => {
    onChange({ ...values, [field]: value });
  };

  const isFormComplete = () => {
    return (
      values.pitchCompelling !== null &&
      values.toughQuestions !== null &&
      values.credibility !== null &&
      values.marketUnderstanding !== null &&
      values.persistence !== null &&
      values.investorRelations !== null &&
      values.coachability !== null
    );
  };

  return (
    <div className="space-y-6 bg-beige p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-violate-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-white text-2xl">📈</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Fundraising Readiness Assessment
          </h1>
          <p className="text-gray-600 mb-4">
            Evaluate the intangible skills that determine fundraising success.
            Assess the founder&apos;s ability to raise capital.
          </p>
          <p className="text-gray-700">
            This assessment focuses on the critical interpersonal skills and
            intangibles that drive fundraising success:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-sm max-w-2xl mx-auto">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="">💬</span>
            <span>Pitch & Storytelling</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="">✅</span>
            <span>Credibility & Trust</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="">🎯</span>
            <span>Market Understanding</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="">👥</span>
            <span>Investor Relations</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="">⚡</span>
            <span>Fundraising Persistence</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="">🎓</span>
            <span>Coachability & Learning</span>
          </div>
        </div>

        {/* Founder Name Input */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">📋 Basic Information</h2>

          <div className="mb-4">
            <Label htmlFor="founderName" className="mb-2 block">
              Founder Name (Optional)
            </Label>
            <input
              id="founderName"
              type="text"
              placeholder={`Enter founder's name`}
              className="peer w-full border border-gray-500 py-2 px-4 text-md bg-white focus:border-blue-600 focus:bg-blue-50 focus:ring-2 focus:ring-blue-500"
              value={values.founderName || ""}
              onChange={(e) => handleChange("founderName", e.target.value)}
            />
          </div>
        </div>

        {/* Assessment Questions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">
            📈 Assessment Questions
          </h2>

          <div className="space-y-8">
            {assessmentQuestions.map((q, index) => (
              <div
                key={q.id}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      {q.category}
                    </span>
                  </div>
                  <Label
                    htmlFor={q.id}
                    className="text-base font-medium text-gray-900"
                  >
                    Question {index + 1}: {q.question}
                  </Label>
                </div>

                <Select
                  value={
                    values[q.id]
                      ? q.options.find((opt) => opt.value === values[q.id])
                          ?.label
                      : ""
                  }
                  onValueChange={(selectedLabel) => {
                    const selectedOption = q.options.find(
                      (opt) => opt.label === selectedLabel
                    );
                    handleChange(q.id, selectedOption.value);
                  }}
                >
                  <SelectTrigger id={q.id} className="w-full">
                    <SelectValue placeholder="Select your assessment" />
                  </SelectTrigger>
                  <SelectContent>
                    {q.options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.label}
                        className="flex flex-col items-start py-3"
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="font-medium">{option.label}</span>
                          <span className="ml-2 px-2 py-1 bg-violate-500 text-white rounded-full text-xs">
                            {option.value}/5
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {/* Calculate Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <button
                type="button"
                className={`w-full py-3 px-6 text-lg font-semibold rounded-lg text-white transition-all ${
                  isFormComplete()
                    ? "bg-violate-500 hover:bg-violate-800 hover:cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isFormComplete()}
                onClick={onCalculate}
              >
                Calculate Assessment
              </button>
              {!isFormComplete() && (
                <p className="mt-2 text-sm text-gray-500">
                  Please answer all questions to calculate your assessment
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
