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
import { getName } from "country-list";

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

async function verifyStoreCountry({
  alpha3Code,
  longitude,
  latitude,
}: VerifyStoreCountryParams): Promise<string> {
  const countriesData = await fetchAllCountriesData();

  const alpha2Code =
    countriesData.find(country => country.alpha3Code === alpha3Code)?.alpha2Code || "";
  if (!alpha2Code) throw new AppError("Country not found", 404);

  const countryData = await fetchCountryData(alpha2Code);
  if (!countryData) throw new AppError("Country not found", 404);

  const countryPolygon = getCountryPolygon(countryData.geojson);

  const storePoint = point([Number(longitude), Number(latitude)]);
  const isStoreInCountry = booleanPointInPolygon(storePoint, countryPolygon[0]);
  const stores = await fetchStoresData();
  const store =
    stores.find(store => store.latitude === latitude && store.longitude === longitude) || null;

  const countryFullName = getName(alpha2Code);

  return isStoreInCountry
    ? `Store ${store?.name ? store.name + " " : ""}is located in ${countryFullName}.`
    : `Store ${store?.name ? store.name + " " : ""}is not located in ${countryFullName}.`;
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
