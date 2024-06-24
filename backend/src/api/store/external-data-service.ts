import { load } from "cheerio";
import { FullCountryData, StoreData } from "../../../../shared/types/system";
import axios from "axios";
import { logger } from "../../services/logger.service";
import { OSMCountryData } from "../../types/store";

async function fetchStoresData(): Promise<StoreData[]> {
  const url = "https://raw.githubusercontent.com/mmcloughlin/starbucks/master/locations.json";
  const response = await axios.get(url);
  const stores = response.data as StoreData[];

  return stores;
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

async function fetchAllCountriesData(): Promise<FullCountryData[]> {
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

export { fetchStoresData, fetchCountryData, fetchAllCountriesData };
