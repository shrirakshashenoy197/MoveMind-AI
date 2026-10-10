const express = require("express");
const cors = require("cors");

const {
  calculateRiskScore,
  getRiskLevel,
} = require("./utils/riskEngine.js");

const app = express();



app.use(cors());
app.use(express.json());

// Temporary storage for hazard reports
const hazards = [];

function calculateFrequency(hazard) {
  const matchingHazards = hazards.filter(
    (item) =>
      item.hazardType === hazard.hazardType &&
      item.location.toLowerCase() === hazard.location.toLowerCase()
  );

  const count = matchingHazards.length;

  return Math.min(count * 20, 100);
}

function calculateRecency(createdAt) {
  const now = new Date();
  const reportDate = new Date(createdAt);

  const differenceInMilliseconds = now - reportDate;
  const differenceInDays =
    differenceInMilliseconds / (1000 * 60 * 60 * 24);

  if (differenceInDays <= 1) {
    return 100;
  }

  if (differenceInDays <= 3) {
    return 80;
  }

  if (differenceInDays <= 7) {
    return 60;
  }

  if (differenceInDays <= 30) {
    return 40;
  }

  return 20;
}

function calculateValidation(hazard) {
  let score = 50;

  if (hazard.hazardType) {
    score += 10;
  }

  if (hazard.location) {
    score += 10;
  }

  if (hazard.description && hazard.description.length >= 20) {
    score += 20;
  }

  if (hazard.severity) {
    score += 10;
  }

  return Math.min(score, 100);
}

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "MoveMind AI backend is running",
  });
});

// Submit a hazard report
app.post("/api/hazards", (req, res) => {
  const { hazardType, severity,location, description } = req.body;

  const newHazard = {
    id: hazards.length + 1,
    hazardType,
    severity,
    location,
    description,
    lat:req.body.lat?? null,
    lng:req.body.lng?? null,
    createdAt: new Date().toISOString(),
  };

 hazards.push(newHazard);

// Calculate risk factors
const frequency = calculateFrequency(newHazard);
const recency = calculateRecency(newHazard.createdAt);
const validation = calculateValidation(newHazard);

const nearbyHazards=frequency;

// Calculate final risk score
const riskScore = calculateRiskScore({
  severity: newHazard.severity,
  nearbyHazards,
  recency,
  
});

// Determine risk level
const riskLevel = getRiskLevel(riskScore);

// Add risk information to the hazard
newHazard.frequency = frequency;
newHazard.nearbyHazards=nearbyHazards;
newHazard.recency = recency;

newHazard.riskScore = riskScore;
newHazard.riskLevel = riskLevel;

console.log("New hazard report:", newHazard);

res.status(201).json({
  success: true,
  message: "Hazard report received",
  hazard: newHazard,
});
});

// Get all hazard reports
app.get("/api/hazards", (req, res) => {
  res.json(hazards);
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`MoveMind AI server running on http://localhost:${PORT}`);
});