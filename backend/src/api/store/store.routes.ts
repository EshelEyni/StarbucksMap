import express from "express";
import { getStoreData, getCountryData } from "./store.controller";

const router = express.Router();

router.get("/", getStoreData);
router.get("/country-data", getCountryData);

export default router;
