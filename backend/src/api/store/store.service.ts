import axios from "axios";
import { getName } from "country-list";
import { StoreData } from "../../../../shared/types/system";
import { point, polygon, booleanPointInPolygon } from "@turf/turf";
import { Feature, GeoJsonProperties, Polygon, Position } from "geojson";
import { logger } from "../../services/logger.service";

type OpenStreetMapResponse = {
  type: string;
  coordinates: Position[][][];
} | null;

const url = "https://raw.githubusercontent.com/mmcloughlin/starbucks/master/locations.json";

async function query({ country }: { country: string }) {
  const response = await axios.get(url);
  let stores = response.data as StoreData[];
  const countries = getListOfCountries(stores);

  if (country === "all") {
    return {
      countries,
      stores,
    };
  }

  const countryBoundary = await fetchCountryBoundary(country);
  stores = filterByCountry({ stores, country, countryBoundary });

  return {
    countries,
    stores,
  };
}

function filterByCountry({
  stores,
  country,
  countryBoundary,
}: {
  stores: StoreData[];
  country: string;
  countryBoundary: OpenStreetMapResponse;
}) {
  // If no country boundary is found, filter by country code
  if (!countryBoundary) {
    return stores.filter(store => store.country === country);
  }

  const countryPolygons = countryBoundary.coordinates.map((coords: Position[][]) =>
    polygon(coords)
  );

  return stores.filter(store => {
    const storePoint = point([store.longitude, store.latitude]);
    return countryPolygons.some((poly: Feature<Polygon, GeoJsonProperties>) =>
      booleanPointInPolygon(storePoint, poly)
    );
  });
}

async function fetchCountryBoundary(country: string): Promise<OpenStreetMapResponse> {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${country}&polygon_geojson=1&limit=1`
    );
    return response.data[0].geojson;
  } catch (error) {
    logger.error("Error fetching country boundary", error);
    return null;
  }
}

function getListOfCountries(data: StoreData[]) {
  const countries = [
    { name: "All", code: "all" },
    ...Array.from(new Set(data.map(location => location.country))).map(country => {
      return {
        name: getName(country),
        code: country,
      };
    }),
  ];
  return countries;
}

export default {
  query,
};
