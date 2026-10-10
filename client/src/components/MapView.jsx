import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const createHazardIcon = (riskLevel) => {
  const markerColors = {
    HIGH: "red",
    MEDIUM: "orange",
    LOW: "green",
  };

  const color = markerColors[riskLevel?.toUpperCase()] || "blue";

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

function MapView() {
  const [hazards, setHazards] = useState([]);

  useEffect(() => {
    const fetchHazards=async()=>{
      try{
        const response=await
    fetch("http://localhost:5000/api/hazards");

    if(!response.ok){
      throw new Error("Failed to fetch hazards from the server");
    }
    const data = await response.json();
      
        console.log("Hazards recieved by map:",data);
        setHazards(data);

  }catch(error){
        console.error("Error loading hazards:", error);
      }
    };
      fetchHazards();
  }, []);

  const locationCoordinates = {
    mangalore: [12.9141, 74.8560],
    manglore: [12.9141, 74.8560],
    bantwal: [12.8900, 75.0340],
    surathkal: [12.9716, 74.8090],
    gangolli: [13.6333, 74.6833],
  };

  return (
    <MapContainer
      center={[12.9141, 74.8560]}
      zoom={11}
      scrollWheelZoom={true}
      className="map-container"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hazards.map((hazard) => {
       const locationKey = hazard.location?.trim().toLowerCase();

const coordinates =
  hazard.lat != null && hazard.lng != null
    ? [Number(hazard.lat), Number(hazard.lng)]
    : locationCoordinates[locationKey];

if (
  !coordinates ||
  !Number.isFinite(coordinates[0]) ||
  !Number.isFinite(coordinates[1])
) {
  return null;
}

        return (
         <Marker
  key={hazard.id}
  position={coordinates}
  icon={createHazardIcon(hazard.riskLevel)}
>
            <Popup>
  <strong>{hazard.hazardType}</strong>
  <br />
  Location: {hazard.location}
  <br />
  Severity: {hazard.severity}
  <br />
  Risk Score: {hazard.riskScore}/100
  <br />
  Risk Level: {hazard.riskLevel}
  <br />
 Nearby Hazards Score:
 {hazard.nearbyHazards}
  <br />
  Recency Score:{hazard.recency}
  <br />
  Description: {hazard.description}
</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MapView;