import { CountryStoreData, StoreDataQueryRes } from "../../../shared/types/system";
import { httpService } from "./http.service";
import { handleServerResponse } from "./util.service";

const baseUrl = "store";

async function query(queryString: string = "") {
  try {
    const response = await httpService.get(`${baseUrl}${queryString}`);

    return handleServerResponse<StoreDataQueryRes>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCountryStoreData() {
  try {
    const response = await httpService.get(`${baseUrl}/country-data`);

    return handleServerResponse<CountryStoreData>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const storeService = {
  query,
  getCountryStoreData,
};
