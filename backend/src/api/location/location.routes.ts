import express from "express";
import { getLocations } from "./location.controller";

const router = express.Router();

router.get("/", getLocations);

export default router;
