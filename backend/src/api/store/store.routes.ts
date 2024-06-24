import express from "express";
import { getStoreData, getCountryStoreData, verifyStoreCountry } from "./store.controller";

const router = express.Router();

router.get("/", getStoreData);
router.get("/country-data", getCountryStoreData);
router.post("/verify-country", verifyStoreCountry);

export default router;
