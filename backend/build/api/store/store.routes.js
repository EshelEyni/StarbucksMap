"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_controller_1 = require("./store.controller");
const router = express_1.default.Router();
router.get("/", store_controller_1.getStoreData);
router.get("/country-data", store_controller_1.getCountryStoreData);
router.post("/verify-country", store_controller_1.verifyStoreCountry);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9zdG9yZS9zdG9yZS5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIseURBQTJGO0FBRTNGLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsK0JBQVksQ0FBQyxDQUFDO0FBQzlCLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLHNDQUFtQixDQUFDLENBQUM7QUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxxQ0FBa0IsQ0FBQyxDQUFDO0FBRW5ELGtCQUFlLE1BQU0sQ0FBQyJ9