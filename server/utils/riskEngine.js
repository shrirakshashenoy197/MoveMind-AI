function calculateRiskScore({
  severity,
  nearbyHazards,
  recency,
}) {
  const severityScores = {
    low: 25,
    medium: 60,
    high: 100,
  };

  const severityValue =
    severityScores[severity?.toLowerCase()] ?? 0;

  const nearbyHazardsValue = Math.max(
    0,
    Math.min(100, Number(nearbyHazards) || 0)
  );

  const recencyValue = Math.max(
    0,
    Math.min(100, Number(recency) || 0)
  );

  const score =
    severityValue * 0.50 +
    nearbyHazardsValue * 0.30 +
    recencyValue * 0.20;

  return Math.round(score);
}

function getRiskLevel(score) {
  if (score >= 61) {
    return "HIGH";
  }

  if (score >= 31) {
    return "MEDIUM";
  }

  return "LOW";
}

module.exports = {
  calculateRiskScore,
  getRiskLevel,
};