const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export async function searchLocation(place) {
  if (!place.trim()) {
    throw new Error("Please enter a location.");
  }

  const url =
    `${NOMINATIM_URL}?format=jsonv2&limit=1&q=` +
    encodeURIComponent(place);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to search for this location.");
  }

  const results = await response.json();

  if (results.length === 0) {
    throw new Error(`Location not found: ${place}`);
  }

  return {
    name: results[0].display_name,
    lat: Number(results[0].lat),
    lng: Number(results[0].lon),
  };
}