import { StoreDataQueryRes } from "../../../shared/types/system";
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

export const storeService = {
  query,
};
