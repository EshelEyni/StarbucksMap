import axios from "axios";
import { getName } from "country-list";
import { StoreData } from "../../../../shared/types/system";
import { point, polygon, booleanPointInPolygon } from "@turf/turf";

const url = "https://raw.githubusercontent.com/mmcloughlin/starbucks/master/locations.json";

async function query({ country }: { country: string }) {
  const response = await axios.get(url);
  let stores = response.data as StoreData[];
  const countries = getListOfCountries(stores);

  if (country !== "all") {
    const countryBoundary = await fetchCountryBoundary(country); // Function to get country boundary as a GeoJSON polygon
    const countryPolygon = polygon(countryBoundary.coordinates);

    stores = stores.filter(store => {
      const storePoint = point([store.longitude, store.latitude]);
      return booleanPointInPolygon(storePoint, countryPolygon);
    });
  }

  return {
    countries,
    stores,
  };
}

async function fetchCountryBoundary(country: string) {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&q=${country}&polygon_geojson=1&limit=1`
  );
  return response.data[0].geojson.coordinates;
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
