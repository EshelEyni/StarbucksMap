import express from "express";
import { getLocations } from "./store.controller";

const router = express.Router();

router.get("/", getLocations);

export default router;
