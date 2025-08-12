"use client";

import { useState, Suspense } from "react";
import NavBar from "@/components/NavBar";
import MpAssessmentForm from "@/components/Assessment/MpAssessmentForm";
import calculateAssessmentResults from "@/lib/assessment/assessmentCalculations";

// Default values for the assessment form
const defaultValues = {
  founderName: "",
  pitchCompelling: null,
  toughQuestions: null,
  credibility: null,
  transparency: null,
  marketUnderstanding: null,
  marketSizingValidation: null,
  investorRelations: null,
  followUpMomentum: null,
  persistence: null,
  coachability: null,
};

function MpAssessmentContent() {
  const [formValues, setFormValues] = useState({ ...defaultValues });
  const [results, setResults] = useState(null);

  const handleFormChange = (newValues) => {
    setFormValues({ ...newValues });
  };

  const handleComplete = () => {
    const calculatedResults = calculateAssessmentResults(formValues);
    setResults(calculatedResults);
  };

  const handleReset = () => {
    setFormValues({ ...defaultValues });
    setResults(null);
  };

  return (
    <main className="min-h-screen pt-12 md:pt-0">
      <MpAssessmentForm
        values={formValues}
        onChange={handleFormChange}
        onComplete={handleComplete}
        onReset={handleReset}
        results={results}
      />
    </main>
  );
}

export default function MpAssessmentPage() {
  return (
    <>
      <NavBar />
      <Suspense
        fallback={<div className="p-8 pt-24">Loading assessment...</div>}
      >
        <MpAssessmentContent />
      </Suspense>
    </>
  );
}
