import { useEffect, useState } from "react";
import { getRoutes } from "../services/routeservices";
import { searchLocation } from "../services/locationServices";
import RouteMap from "../components/RouteMap";

function RouteComparison() {
  const [hazards, setHazards] = useState([]);

  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");

  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://movemind-ai.onrender.com/api/hazards")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch hazards");
        }

        return response.json();
      })
      .then((data) => {
        setHazards(data);
      })
      .catch((error) => {
        console.error("Error loading hazards:", error);
      });
  }, []);

  async function handleFindRoutes(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setRoutes([]);

    try {
      const start = await searchLocation(startLocation);
      const end = await searchLocation(destination);

      if (
        start.lat === end.lat &&
        start.lng === end.lng
      ) {
        throw new Error(
          "Starting point and destination must be different."
        );
      }

      const foundRoutes = await getRoutes(start, end);

      setRoutes(foundRoutes);
    } catch (error) {
      setError(
        error.message ||
          "Unable to find routes. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const averageHazardRisk =
    hazards.length > 0
      ? Math.round(
          hazards.reduce(
            (total, hazard) =>
              total + (Number(hazard.riskScore) || 0),
            0
          ) / hazards.length
        )
      : null;

  // Route-specific hazard matching is not implemented yet.
  // Do not present the average report score as a verified
  // risk score for each actual road route.

  const recommendedRoute =
    routes.length > 0
      ? [...routes].sort(
          (a, b) => a.time - b.time
        )[0]
      : null;

  return (
    <main className="routes-page">
      <section className="page-header">
        <p className="eyebrow">RISK-AWARE ROUTING</p>

        <h1>Compare Routes</h1>

        <p>
          Enter your starting point and destination to
          retrieve real driving routes.
        </p>
      </section>

      <section className="route-explanation">
        <form onSubmit={handleFindRoutes}>
          <div>
            <label htmlFor="start-location">
              Starting Point
            </label>

            <input
              id="start-location"
              type="text"
              value={startLocation}
              onChange={(event) =>
                setStartLocation(event.target.value)
              }
              placeholder="e.g. Mangalore"
              required
            />
          </div>

          <div>
            <label htmlFor="destination">
              Destination
            </label>

            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(event) =>
                setDestination(event.target.value)
              }
              placeholder="e.g. Surathkal"
              required
            />
          </div>

          <button
            className="route-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Finding Routes..." : "Find Routes"}
          </button>
        </form>

        {error && (
          <p role="alert">{error}</p>
        )}
      </section>

      {hazards.length === 0 && (
        <section className="route-explanation">
          <h2>No hazards reported yet</h2>

          <p>
            No reports does not mean a route is confirmed
            safe. Submit hazard reports to build the
            available hazard dataset.
          </p>
        </section>
      )}

      {routes.length > 0 && (
        <>
        <RouteMap routes={routes} hazards={hazards} />
          <section className="route-grid">
            {routes.map((route) => (
              <article
                className="route-card"
                key={route.id}
              >
                <div className="route-card-header">
                  <h2>{route.name}</h2>

                  <span className="risk-label">
                    Risk unavailable
                  </span>
                </div>

                <div className="route-details">
                  <div>
                    <span>Distance</span>

                    <strong>
                      {route.distance.toFixed(2)} km
                    </strong>
                  </div>

                  <div>
                    <span>ETA</span>

                    <strong>
                      {Math.round(route.time)} min
                    </strong>
                  </div>

                  <div>
                    <span>Reported Hazards</span>

                    <strong>
                      Not calculated
                    </strong>
                  </div>
                </div>

                <button
                  className="route-button"
                  type="button"
                  onClick={() => {
                    alert(
                      `${route.name}\n` +
                        `Distance: ${route.distance.toFixed(2)} km\n` +
                        `Travel time: ${Math.round(route.time)} min\n` +
                        "Route-specific risk: Not calculated yet."
                    );
                  }}
                >
                  View Route Details
                </button>
              </article>
            ))}
          </section>

          {recommendedRoute && (
            <section className="route-explanation">
              <p className="eyebrow">
                ROUTE SUGGESTION
              </p>

              <h2>
                Fastest returned route:{" "}
                {recommendedRoute.name}
              </h2>

              <p>
                This route has the shortest estimated
                travel time among the routes returned by
                the routing service. It has not yet been
                verified as the safest route.
              </p>
            </section>
          )}
        </>
      )}

      <section className="route-explanation">
        <p className="eyebrow">DECISION SUPPORT</p>

        <h2>
          The fastest route isn't always the lowest-risk route.
        </h2>

        <p>
          MoveMind aims to help commuters compare travel
          efficiency with reported road hazards.
        </p>
      </section>
    </main>
  );
}

export default RouteComparison;