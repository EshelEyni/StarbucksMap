import { asyncErrorCatcher } from "../../services/error.service";
import storeService from "./store.service";

const getStoreData = asyncErrorCatcher(async (req, res, next) => {
  const { country } = req.query;
  const data = await storeService.query({ country: country?.toString() || "all" });

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    results: data.stores.length,
    data,
  });
});

const getCountryData = asyncErrorCatcher(async (req, res, next) => {
  const data = await storeService.getFullCountryData();

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    results: data.length,
    data,
  });
});

export { getStoreData, getCountryData };
