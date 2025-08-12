// Assessment calculation logic (updated for 10 questions)
export default function calculateAssessmentResults(values) {
  // Raw 1–5 scores for all questions
  const scores = [
    values.pitchCompelling,
    values.toughQuestions,
    values.credibility,
    values.transparency,
    values.marketUnderstanding, // deep market knowledge
    values.marketSizingValidation, // market sizing & validation
    values.investorRelations, // relationship building
    values.followUpMomentum, // follow-up & momentum
    values.persistence, // rejections & setbacks
    values.coachability, // incorporates feedback
  ];

  // Defensive check: if any score is undefined/null, treat as 0
  const safe = (n) => (typeof n === "number" && !Number.isNaN(n) ? n : 0);

  // Category scores (1–5 -> percentage)
  const categoryScores = {
    pitchStorytelling: Math.round(
      ((safe(values.pitchCompelling) + safe(values.toughQuestions)) / 2) * 20
    ),
    credibilityTrust: Math.round(
      ((safe(values.credibility) + safe(values.transparency)) / 2) * 20
    ),
    marketUnderstanding: Math.round(
      ((safe(values.marketUnderstanding) +
        safe(values.marketSizingValidation)) /
        2) *
        20
    ),
    investorRelations: Math.round(
      ((safe(values.investorRelations) + safe(values.followUpMomentum)) / 2) *
        20
    ),
    persistence: Math.round(safe(values.persistence) * 20),
    coachability: Math.round(safe(values.coachability) * 20),
  };

  // Overall (average of all 10 raw scores)
  const answered = scores.filter(
    (s) => typeof s === "number" && !Number.isNaN(s)
  );
  const overallScore = answered.length
    ? Math.round(
        (answered.reduce((sum, s) => sum + s, 0) / answered.length) * 20
      )
    : 0;

  const insights = generateInsights(overallScore, categoryScores);

  return { overallScore, categoryScores, insights };
}

function generateInsights(overallScore, categoryScores) {
  const insights = [];

  // Overall
  if (overallScore >= 70) {
    insights.push(
      "Strong fundraising capabilities with good potential for success"
    );
  } else if (overallScore >= 55) {
    insights.push("Has some fundraising strengths but significant gaps remain");
  } else {
    insights.push(
      "Requires substantial development before approaching investors"
    );
  }

  // Pitch & Storytelling
  if (categoryScores.pitchStorytelling < 60) {
    insights.push(
      "Recommend intensive pitch coaching before approaching investors"
    );
  } else if (categoryScores.pitchStorytelling >= 80) {
    insights.push(
      "Exceptional storytelling and pitch capabilities — key strength"
    );
  } else {
    insights.push("Good storytelling foundation, minor refinements needed");
  }

  // Credibility & Trust
  if (categoryScores.credibilityTrust < 60) {
    insights.push(
      "Focus on strengthening credibility and openly addressing risks"
    );
  } else if (categoryScores.credibilityTrust >= 80) {
    insights.push(
      "Excellent credibility and transparency — strong trust builder"
    );
  } else {
    insights.push("Solid credibility base; continue building track record");
  }

  // Market Understanding
  if (categoryScores.marketUnderstanding < 60) {
    insights.push(
      "Deepen market research and validate market sizing with data"
    );
  } else if (categoryScores.marketUnderstanding >= 80) {
    insights.push(
      "Strong market expertise and validation will resonate with investors"
    );
  }

  // Investor Relations
  if (categoryScores.investorRelations < 60) {
    insights.push(
      "Improve relationship building and follow-up cadence with investors"
    );
  } else if (categoryScores.investorRelations >= 80) {
    insights.push(
      "Excellent relationship building and momentum maintenance — major advantage"
    );
  }

  // Persistence
  if (categoryScores.persistence < 60) {
    insights.push(
      "Develop stronger resilience and follow-through after rejections"
    );
  } else if (categoryScores.persistence >= 80) {
    insights.push("Great persistence — crucial for fundraising success");
  }

  // Coachability
  if (categoryScores.coachability < 60) {
    insights.push("Work on being more receptive to feedback and coaching");
  } else if (categoryScores.coachability >= 80) {
    insights.push(
      "High coachability will accelerate fundraising skill development"
    );
  }

  return insights.slice(0, 4);
}
