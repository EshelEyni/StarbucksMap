import axios from "axios";
import { getName } from "country-list";
import { StoreData, StoreDataQueryRes } from "../../../../shared/types/system";
import { point, polygon, booleanPointInPolygon } from "@turf/turf";
import { Feature, GeoJsonProperties, Polygon, Position } from "geojson";
import { logger } from "../../services/logger.service";

type CountryData = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
  geojson: {
    type: string;
    coordinates: Position[][][] | Position[][];
  };
} | null;

const url = "https://raw.githubusercontent.com/mmcloughlin/starbucks/master/locations.json";

async function query({ country }: { country: string }): Promise<StoreDataQueryRes> {
  const response = await axios.get(url);
  let stores = response.data as StoreData[];
  const countries = getListOfCountries(stores);

  if (country === "all") {
    return {
      countries,
      stores,
      centralPoint: null,
      zoomLevel: null,
    };
  }

  const countryData = await fetchcountryData(country);
  stores = filterByCountry({ stores, country, countryData });
  const centralPoint = getCentralPoint(countryData);
  const zoomLevel = getZoomLevel(countryData);

  return {
    countries,
    stores,
    centralPoint,
    zoomLevel,
  };
}

function filterByCountry({
  stores,
  country,
  countryData,
}: {
  stores: StoreData[];
  country: string;
  countryData: CountryData;
}) {
  // If no country boundary is found, filter by country code
  if (!countryData || !countryData.geojson || !countryData.geojson.coordinates) {
    return stores.filter(store => store.country === country);
  }

  const { coordinates } = countryData.geojson;

  let countryPolygons: Feature<Polygon, GeoJsonProperties>[];

  if (countryData.geojson.type === "MultiPolygon") {
    countryPolygons = (coordinates as Position[][][]).map(coords => polygon(coords));
  } else {
    countryPolygons = [polygon(coordinates as Position[][]) as Feature<Polygon, GeoJsonProperties>];
  }

  return stores.filter(store => {
    const storePoint = point([store.longitude, store.latitude]);
    return countryPolygons.some((poly: Feature<Polygon, GeoJsonProperties>) =>
      booleanPointInPolygon(storePoint, poly)
    );
  });
}

async function fetchcountryData(country: string): Promise<CountryData> {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${country}&polygon_geojson=1&limit=1`
    );
    return response.data[0];
  } catch (error) {
    logger.error("Error fetching country boundary", error);
    return null;
  }
}

function getListOfCountries(data: StoreData[]) {
  const countries = [
    { name: "All", code: "all" },
    ...Array.from(new Set(data.map(store => store.country))).map(country => {
      return {
        name: getName(country) || country,
        code: country,
      };
    }),
  ];
  return countries;
}

function getCentralPoint(countryData: CountryData): [number, number] | null {
  if (!countryData || !countryData.boundingbox || countryData.boundingbox.length !== 4) return null;
  const { boundingbox } = countryData;
  const [minLat, maxLat, minLon, maxLon] = boundingbox.map(Number);
  const centralLat = (minLat + maxLat) / 2;
  const centralLon = (minLon + maxLon) / 2;
  return [centralLon, centralLat];
}

function getZoomLevel(countryData: CountryData): number | null {
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

export default {
  query,
};
