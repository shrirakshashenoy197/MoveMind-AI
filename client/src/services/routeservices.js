const OSRM_BASE_URL = "https://router.project-osrm.org";

export async function getRoutes(start, destination) {
  const coordinates =
    `${start.lng},${start.lat};${destination.lng},${destination.lat}`;

  const url =
    `${OSRM_BASE_URL}/route/v1/driving/${coordinates}` +
    "?alternatives=true&overview=full&geometries=geojson";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to retrieve routes.");
  }

  const data = await response.json();

  if (data.code !== "Ok" || !data.routes?.length) {
    throw new Error("No driving routes were found.");
  }

  return data.routes.map((route, index) => ({
    id: index + 1,
    name: `Route ${String.fromCharCode(65 + index)}`,
    distance: route.distance / 1000,
    time: route.duration / 60,
    risk: null,
    geometry: route.geometry,
  }));
}