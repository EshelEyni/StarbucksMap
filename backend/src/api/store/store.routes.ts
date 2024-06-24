import express from "express";
import { getStoreData, getCountryStoreData, verifyStoreCountry } from "./store.controller";

const router = express.Router();

router.get("/", getStoreData);
router.get("/country-data", getCountryStoreData);
router.get("/verify-country", verifyStoreCountry);

export default router;
