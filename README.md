# MoveMind AI
### Community-Powered Urban Mobility Intelligence Platform

MoveMind AI is a road-safety platform that helps people identify reported road hazards and compare routes using distance, estimated travel time, and available hazard information.

## Problem Statement

Road hazards such as potholes, waterlogging, damaged roads, and obstructions can make daily travel difficult and unsafe. People may not have an easy way to view and share information about these hazards.

## Our Solution

MoveMind AI provides a platform where users can report road hazards, view reported hazards on an interactive map, and compare available routes to make more informed travel decisions.

## Key Features

- **Hazard Reporting:** Submit road hazards with their type, severity, location, and description.
- **Interactive Risk Map:** View reported hazards on a map.
- **Risk Scoring:** Calculate risk scores using hazard severity, frequency-related information, and recency.
- **Route Comparison:** Compare available routes based on distance, estimated travel time, and reported hazard information.
- **Location Search:** Select locations to explore available routes.

## Technology Stack

### Frontend
- React
- Vite
- JavaScript
- React Router
- React Leaflet
- Leaflet

### Backend
- Node.js
- Express.js
- REST API

### Mapping and Routing
- OpenStreetMap
- OSRM routing service
- Nominatim location search

## Project Structure

```text
MoveMind-AI/
├── client/
│   ├── src/
│   ├── package.json
│   └── ...
├── server/
│   ├── server.js
│   ├── utils/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/shrirakshashenoy197/MoveMind-AI.git
cd MoveMind-AI
```

### 2. Start the Backend

```bash
cd server
npm install
npm start
```

The backend runs on port 5000 by default.

### 3. Start the Frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## Live Demo

**Try MoveMind AI:** https://movemind-ai-1.onrender.com/

## GitHub Repository

https://github.com/shrirakshashenoy197/MoveMind-AI

## Limitations

- Hazard reports are currently stored in server memory and may be lost when the backend restarts.
- Route comparisons depend on available routing-service data.
- Risk scores are estimates based on the information available in the prototype; they are not official road-safety assessments.

## Future Improvements

- Persistent database storage
- Community validation of hazard reports
- Improved geographic hazard analysis
- More detailed route-risk calculations
- Real-time hazard updates

## Team

**Team Name:** CodeOrbit

**Institution:** Canara Engineering College

### Team Members
- Shrirakshasha Shenoy
- Sanjana TR
- Nishmitha Rai M
- Nireeksha Venkatraman Naik

## Purpose

Built as a student project to explore how community reporting, mapping, and route information can support safer urban mobility.
