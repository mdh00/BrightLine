import express from "express";
import { getAllServices, createService, getServiceById, deleteService } from "../application/services.js";

const servicesRouter = express.Router();

servicesRouter
    .route("/")
    .get(getAllServices)
    .post(createService);

servicesRouter
    .route("/:id")
    .get(getServiceById)
    .delete(deleteService);

export default servicesRouter;
