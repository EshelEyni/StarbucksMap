import { asyncErrorCatcher } from "../../services/error.service";
import locationService from "./location.service";

const getLocations = asyncErrorCatcher(async (req, res, next) => {
  const data = await locationService.query();

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    results: data.locations.length,
    data,
  });
});

export { getLocations };
