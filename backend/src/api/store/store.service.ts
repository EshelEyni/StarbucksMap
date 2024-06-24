import axios from "axios";
import { getName } from "country-list";
import {
  CountryStoreData,
  FullCountryData,
  StoreData,
  StoreDataQueryRes,
  VerifyStoreCountryParams,
} from "../../../../shared/types/system";
import { point, polygon, booleanPointInPolygon } from "@turf/turf";
import { Feature, GeoJsonProperties, Polygon, Position } from "geojson";
import { logger } from "../../services/logger.service";
import { load } from "cheerio";
import { AppError } from "../../services/error.service";

type OSMCountryData = {
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
  geojson: GeoJson;
} | null;

type GeoJson = {
  type: string;
  coordinates: Position[][][] | Position[][];
};

const url = "https://raw.githubusercontent.com/mmcloughlin/starbucks/master/locations.json";

async function query({ country }: { country: string }): Promise<StoreDataQueryRes> {
  const response = await axios.get(url);
  let stores = response.data as StoreData[];
  const countries = getListOfStoreCountries(stores);

  if (country === "all") {
    return {
      countries,
      stores,
      centralPoint: null,
      zoomLevel: null,
    };
  }

  const countryData = await fetchCountryData(country);
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

async function fetchCountryData(country: string): Promise<OSMCountryData> {
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

function getListOfStoreCountries(data: StoreData[]) {
  const countries = [
    { name: "All", code: "all" },
    ...Array.from(new Set(data.map(store => store.country)))
      .map(country => {
        return {
          name: getName(country) || country,
          code: country,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name)),
  ];
  return countries;
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

async function getFullCountryData(): Promise<FullCountryData[]> {
  const url = "https://www.iban.com/country-codes";
  const { data } = await axios.get(url);

  const $ = load(data);
  const countries: FullCountryData[] = [];

  $("table#myTable tbody tr").each((i, element) => {
    const name = $(element).find("td").first().text().trim();
    const alpha2Code = $(element).find("td").eq(1).text().trim();
    const alpha3Code = $(element).find("td").eq(2).text().trim();
    countries.push({ name, alpha2Code, alpha3Code });
  });

  return countries;
}

async function getCountryStoreData(): Promise<CountryStoreData> {
  const countries = await getFullCountryData();
  const res = await query({ country: "all" });
  const { stores } = res;
  return {
    countries,
    stores,
  };
}

function getCountryPolygon(geojson: GeoJson) {
  let countryPolygons: Feature<Polygon, GeoJsonProperties>[];
  const { type, coordinates } = geojson;

  if (type === "MultiPolygon") {
    countryPolygons = (coordinates as Position[][][]).map(coords => polygon(coords));
  } else {
    countryPolygons = [polygon(coordinates as Position[][]) as Feature<Polygon, GeoJsonProperties>];
  }
  return countryPolygons;
}

async function verifyStoreCountry({ country, store }: VerifyStoreCountryParams): Promise<string> {
  const countryData = await fetchCountryData(country.alpha2Code);
  if (!countryData) throw new AppError("Country data not found", 404);
  const countryPolygon = getCountryPolygon(countryData.geojson);

  const { longitude, latitude } = store;
  const storePoint = point([Number(longitude), Number(latitude)]);
  const isStoreInCountry = booleanPointInPolygon(storePoint, countryPolygon[0]);

  return isStoreInCountry
    ? `Store ${store.name} is located in ${country.name}.`
    : `Store ${store.name} is not located in ${country.name}.`;
}

export default {
  query,
  getCountryStoreData,
  verifyStoreCountry,
};
