import { LocationData } from "../../../shared/types/system";
import { httpService } from "./http.service";
import { handleServerResponse } from "./util.service";

const baseUrl = "location";

async function query(queryString: string = "") {
  try {
    const response = await httpService.get(`${baseUrl}${queryString}`);
    return handleServerResponse<LocationData>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const locationService = {
  query,
};
