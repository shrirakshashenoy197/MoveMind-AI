import MapView from "../components/MapView";

function RiskMap() {
  return (
    <main className="risk-map-page">
      <section className="page-header">
        <p className="eyebrow">GEOSPATIAL INTELLIGENCE</p>

        <h1>Mobility Risk Map</h1>

        <p>
          Explore reported hazards and identify areas with higher mobility
          risk.
        </p>
      </section>

      <section className="map-card">
        <MapView />
      </section>
    </main>
  );
}

export default RiskMap;