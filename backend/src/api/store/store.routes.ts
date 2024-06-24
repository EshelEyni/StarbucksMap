import express from "express";
import { getStoreData, getCountryStoreData } from "./store.controller";

const router = express.Router();

router.get("/", getStoreData);
router.get("/country-data", getCountryStoreData);

export default router;
