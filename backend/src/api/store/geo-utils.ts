import { StoreData } from "../../../../shared/types/system";
import { point, polygon, booleanPointInPolygon } from "@turf/turf";
import { Feature, GeoJsonProperties, Polygon, Position } from "geojson";
import { GeoJson, OSMCountryData } from "../../types/store";

function getCountryPolygon(geojson: GeoJson) {
  let countryPolygons: Feature<Polygon, GeoJsonProperties>[];
  const { type, coordinates } = geojson;

  if (type === "MultiPolygon")
    countryPolygons = (coordinates as Position[][][]).map(coords => polygon(coords));
  else
    countryPolygons = [polygon(coordinates as Position[][]) as Feature<Polygon, GeoJsonProperties>];

  return countryPolygons;
}

function getCentralPoint(countryData: OSMCountryData): [number, number] | null {
  if (!countryData || !countryData.boundingbox || countryData.boundingbox.length !== 4) return null;
  const { boundingbox } = countryData;
  const [minLat, maxLat, minLon, maxLon] = boundingbox.map(Number);
  const centralLat = (minLat + maxLat) / 2;
  const centralLon = (minLon + maxLon) / 2;
  return [centralLon, centralLat];
}

function getZoomLevel(countryData: OSMCountryData): number | null {
  if (!countryData || !countryData.boundingbox || countryData.boundingbox.length !== 4) return null;
  const { boundingbox } = countryData;
  const [minLat, maxLat, minLon, maxLon] = boundingbox.map(Number);
  const maxDiff = Math.max(maxLat - minLat, maxLon - minLon);

  switch (true) {
    case maxDiff > 10:
      return 3; // Very large countries
    case maxDiff > 5:
      return 5; // Large countries
    case maxDiff > 2:
      return 7; // Medium countries
    case maxDiff > 1:
      return 8; // Small countries
    case maxDiff > 0.5:
      return 9; // Smaller countries
    default:
      return 10; // Very small countries
  }
}

function filterByCountry({
  stores,
  country,
  countryData,
}: {
  stores: StoreData[];
  country: string;
  countryData: OSMCountryData;
}) {
  // If no country boundary is found, filter by country code
  if (!countryData || !countryData.geojson || !countryData.geojson.coordinates) {
    return stores.filter(store => store.country === country);
  }

  const { geojson } = countryData;
  const countryPolygons: Feature<Polygon, GeoJsonProperties>[] = getCountryPolygon(geojson);

  return stores.filter(store => {
    const storePoint = point([store.longitude, store.latitude]);
    return countryPolygons.some((poly: Feature<Polygon, GeoJsonProperties>) =>
      booleanPointInPolygon(storePoint, poly)
    );
  });
}

export { getCountryPolygon, getCentralPoint, getZoomLevel, filterByCountry };
