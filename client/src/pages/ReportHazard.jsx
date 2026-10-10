import { useState } from "react";

function ReportHazard() {
  const [hazardType, setHazardType] = useState("");
  const [severity, setSeverity] = useState("");
  const [location, setLocation] = useState("");
  const [latitude,setLatitude]=useState("");
  const [longitude,setLongitude]=useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleGetCoordinates = async () => {
  if (!location.trim()) {
    alert("Please enter a location first.");
    return;
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(location)}`
    );

    if (!response.ok) {
      throw new Error("Location search failed.");
    }

    const results = await response.json();

    if (results.length === 0) {
      alert("Location not found. Please enter a more specific location.");
      return;
    }

    setLatitude(results[0].lat);
    setLongitude(results[0].lon);

    alert(
      `Coordinates found:\nLatitude: ${results[0].lat}\nLongitude: ${results[0].lon}`
    );
  } catch (error) {
    console.error("Coordinate lookup failed:", error);
    alert("Unable to find coordinates. Check your internet connection.");
  }
};

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://movemind-ai.onrender.com/api/hazards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hazardType,
          severity,
          location,
          description,
          lat:latitude===""?null:Number(latitude),
          lng:longitude===""?null:Number(longitude),
        }),
      });

      const data = await response.json();

      console.log("Server response:", data);

      if (data.success) {
        setSubmitted(true);

        setHazardType("");
        setSeverity("");
        setLocation("");
        setDescription("");
        setLatitude("");
        setLongitude("");

        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting hazard:", error);
      alert("Unable to connect to the MoveMind AI server.");
    }
  };

  return (
    <main className="report-page">
      <section className="page-header">
        <p className="eyebrow">COMMUNITY REPORTING</p>

        <h1>Report a Hazard</h1>

        <p>
          Help other commuters by reporting a road or mobility problem
          you've encountered.
        </p>
      </section>

      <section className="report-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="hazardType">Hazard Type</label>

            <select
              id="hazardType"
              value={hazardType}
              onChange={(event) => setHazardType(event.target.value)}
              required
            >
              <option value="">Select hazard type</option>
              <option value="pothole">Pothole</option>
              <option value="waterlogging">Waterlogging</option>
              <option value="road-damage">Road Damage</option>
              <option value="obstruction">Road Obstruction</option>
              <option value="accident-prone">Accident-Prone Area</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="severity">Severity</label>

            <select
              id="severity"
              value={severity}
              onChange={(event) => setSeverity(event.target.value)}
              required
            >
              <option value="">Select severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>

            <input
              id="location"
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Enter the hazard location..."
              required
            />
          </div>

          <div className="form-group">
  <button
    type="button"
    className="primary-button"
    onClick={handleGetCoordinates}
  >
    Find Location Coordinates
  </button>

  {latitude !== "" && longitude !== "" && (
    <p>
      Coordinates: {latitude}, {longitude}
    </p>
  )}
</div>

          <div className="form-group">
            <label 
            htmlFor="description">Description</label>

            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the hazard and its condition..."
              rows="5"
              required
            />
          </div>

          <button type="submit" className="primary-button">
            Submit Hazard Report
          </button>

          {submitted && (
            <div className="success-message">
              Hazard report submitted successfully.
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

export default ReportHazard;