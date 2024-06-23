import { AppError, asyncErrorCatcher } from "../../services/error.service";
import locationService from "./location.service";

const getLocations = asyncErrorCatcher(async (req, res, next) => {
  const locations = await locationService.query();

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    // results: locations.length,
    data: locations,
  });
});

export { getLocations };
