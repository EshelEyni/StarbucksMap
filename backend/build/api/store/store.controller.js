"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyStoreCountry = exports.getCountryStoreData = exports.getStoreData = void 0;
const error_service_1 = require("../../services/error.service");
const store_service_1 = __importDefault(require("./store.service"));
const getStoreData = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const { country } = req.query;
    const data = await store_service_1.default.query({ country: country?.toString() || "all" });
    res.status(200).json({
        status: "success",
        requestedAt: new Date().toISOString(),
        results: data.stores.length,
        data,
    });
});
exports.getStoreData = getStoreData;
const getCountryStoreData = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const data = await store_service_1.default.getCountryStoreData();
    res.status(200).json({
        status: "success",
        requestedAt: new Date().toISOString(),
        data,
    });
});
exports.getCountryStoreData = getCountryStoreData;
const verifyStoreCountry = (0, error_service_1.asyncErrorCatcher)(async (req, res, next) => {
    const { alpha3Code, longitude, latitude } = req.body;
    if (!alpha3Code || !longitude || !latitude)
        throw new error_service_1.AppError("Country code, longitude and latitude are required", 400);
    const data = await store_service_1.default.verifyStoreCountry({ alpha3Code, longitude, latitude });
    res.status(200).json({
        status: "success",
        requestedAt: new Date().toISOString(),
        data,
    });
});
exports.verifyStoreCountry = verifyStoreCountry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvc3RvcmUvc3RvcmUuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnRUFBMkU7QUFDM0Usb0VBQTJDO0FBRTNDLE1BQU0sWUFBWSxHQUFHLElBQUEsaUNBQWlCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDOUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDOUIsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQztJQUVqRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQixNQUFNLEVBQUUsU0FBUztRQUNqQixXQUFXLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFDckMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtRQUMzQixJQUFJO0tBQ0wsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUEyQk0sb0NBQVk7QUF6QnJCLE1BQU0sbUJBQW1CLEdBQUcsSUFBQSxpQ0FBaUIsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNyRSxNQUFNLElBQUksR0FBRyxNQUFNLHVCQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUV0RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQixNQUFNLEVBQUUsU0FBUztRQUNqQixXQUFXLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFDckMsSUFBSTtLQUNMLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBaUJvQixrREFBbUI7QUFmMUMsTUFBTSxrQkFBa0IsR0FBRyxJQUFBLGlDQUFpQixFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3BFLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFFckQsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFFBQVE7UUFDeEMsTUFBTSxJQUFJLHdCQUFRLENBQUMsbURBQW1ELEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFL0UsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBRXhGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFdBQVcsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtRQUNyQyxJQUFJO0tBQ0wsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFeUMsZ0RBQWtCIn0=