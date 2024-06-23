import { asyncErrorCatcher } from "../../services/error.service";
import locationService from "./store.service";

const getLocations = asyncErrorCatcher(async (req, res, next) => {
  const { country } = req.query;
  const data = await locationService.query({ country: country?.toString() || "all" });

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    results: data.stores.length,
    data,
  });
});

export { getLocations };
