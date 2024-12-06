import express from "express";
import { getAllServices, createService } from "../application/services.js";

const servicesRouter = express.Router();

servicesRouter
    .route("/")
    .get(getAllServices)
    .post(createService);

export default servicesRouter;
