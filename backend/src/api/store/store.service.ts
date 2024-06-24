import {
  CountryStoreData,
  StoreDataQueryRes,
  VerifyStoreCountryParams,
} from "../../../../shared/types/system";
import { point, booleanPointInPolygon } from "@turf/turf";
import { AppError } from "../../services/error.service";
import { filterByCountry, getCentralPoint, getCountryPolygon, getZoomLevel } from "./geo-utils";
import { getListOfStoreCountries } from "./data-utils";
import { fetchAllCountriesData, fetchCountryData, fetchStoresData } from "./external-data-service";

async function query({ country }: { country: string }): Promise<StoreDataQueryRes> {
  let stores = await fetchStoresData();
  const countries = getListOfStoreCountries(stores);

  if (country === "all") {
    return {
      countries,
      stores,
      centralPoint: [34.794758, 32.07576],
      zoomLevel: 6,
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

async function getCountryStoreData(): Promise<CountryStoreData> {
  const countries = await fetchAllCountriesData();
  const res = await query({ country: "all" });
  const { stores } = res;

  return { countries, stores };
}

export default {
  query,
  getCountryStoreData,
  verifyStoreCountry,
};
