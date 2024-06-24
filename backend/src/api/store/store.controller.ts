import { AppError, asyncErrorCatcher } from "../../services/error.service";
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

const getCountryStoreData = asyncErrorCatcher(async (req, res, next) => {
  const data = await storeService.getCountryStoreData();

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    data,
  });
});

const verifyStoreCountry = asyncErrorCatcher(async (req, res, next) => {
  const [alpha3Code, longitude, latitude] = [
    req.query.alpha3Code?.toString(),
    req.query.longitude?.toString(),
    req.query.latitude?.toString(),
  ];

  if (!alpha3Code || !longitude || !latitude) throw new AppError("Invalid query parameters", 400);

  const data = await storeService.verifyStoreCountry({ alpha3Code, longitude, latitude });

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    data,
  });
});

export { getStoreData, getCountryStoreData, verifyStoreCountry };
