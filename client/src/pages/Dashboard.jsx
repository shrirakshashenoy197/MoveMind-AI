function Dashboard() {
  return (
    <main className="dashboard">
      <section className="hero-section">
        <p className="eyebrow">URBAN MOBILITY INTELLIGENCE</p>

        <h1>
          Move smarter.
          <br />
          Understand your route.
        </h1>

        <p className="hero-text">
          MoveMind AI combines community hazard reports and mobility risk
          insights to help commuters make better route decisions.
        </p>

        <div className="dashboard-actions">
          <a href="/report" className="primary-button">
            Report a Hazard
          </a>

          <a href="/map" className="secondary-button">
            Explore Risk Map
          </a>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <span>Reported Hazards</span>
          <strong>24</strong>
        </div>

        <div className="stat-card">
          <span>High-Risk Areas</span>
          <strong>6</strong>
        </div>

        <div className="stat-card">
          <span>Routes Compared</span>
          <strong>18</strong>
        </div>

        <div className="stat-card">
          <span>Average Risk</span>
          <strong>42/100</strong>
        </div>
      </section>

      <section className="decision-section">
        <div>
          <p className="eyebrow">THE CORE IDEA</p>
          <h2>Don't choose a route based on time alone.</h2>
        </div>

        <p>
          MoveMind AI compares distance, estimated travel time, reported
          hazards, and mobility risk so users can understand the trade-off
          before choosing a route.
        </p>
      </section>
    </main>
  );
}

export default Dashboard;