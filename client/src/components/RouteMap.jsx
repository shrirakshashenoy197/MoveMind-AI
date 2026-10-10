import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Popup,
  Marker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapUpdater({ routes }) {
  const map = useMap();

  useEffect(() => {
    if (routes.length === 0) return;

    const allCoordinates = routes.flatMap((route) =>
      route.geometry.coordinates.map(([lng, lat]) => [
        lat,
        lng,
      ])
    );

    if (allCoordinates.length > 0) {
      map.fitBounds(allCoordinates, {
        padding: [30, 30],
      });
    }
  }, [routes, map]);

  return null;
}

function RouteMap({ routes,hazards=[] }) {
  if (!routes || routes.length === 0) {
    return (
      <p>Find routes to display them on the map.</p>
    );
  }

  return (
    <section className="route-map-section">
      <h2>Route Map</h2>

      <MapContainer
        center={[12.9141, 74.856]}
        zoom={11}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater routes={routes} />

        {hazards.map((hazard) => {
  const locationCoordinates = {
    mangalore: [12.9141, 74.856],
    manglore: [12.9141, 74.856],
    bantwal: [12.89, 75.034],
    surathkal: [12.9716, 74.809],
    gangolli: [13.6333, 74.6833],
  };

  const locationKey = String(hazard.location || "")
    .trim()
    .toLowerCase();

  const position = locationCoordinates[locationKey];

  if (!position) return null;

  return (
    <Marker
      key={hazard._id || hazard.id}
      position={position}
    >
      <Popup>
        <strong>
          {hazard.hazardType || "Road hazard"}
        </strong>
        <br />
        Location: {hazard.location}
        <br />
        Severity: {hazard.severity}
        <br />
        {hazard.description}
      </Popup>
    </Marker>
  );
})}

        {routes.map((route, index) => {
          const positions =
            route.geometry.coordinates.map(
              ([lng, lat]) => [lat, lng]
            );

          const routeColor = [
            "#7c3aed",
            "#0891b2",
            "#ea580c",
          ][index % 3];

          return (
            <Polyline
              key={route.id}
              positions={positions}
              pathOptions={{
                color: routeColor,
                weight: 5,
                opacity: 0.8,
              }}
            >
              <Popup>
                <strong>{route.name}</strong>
                <br />
                Distance: {route.distance.toFixed(2)} km
                <br />
                Estimated time: {Math.round(route.time)} min
              </Popup>
            </Polyline>
          );
        })}
      </MapContainer>

      <p>
        Different line colors distinguish the routes.
        Select a route line to view its travel details.
      </p>
    </section>
  );
}

export default RouteMap;