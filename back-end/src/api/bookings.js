import express from "express";
import { getAllBookings, createBooking, getBookingById, updateBooking, deleteBooking } from "../application/bookings.js"; 

const bookingsRouter = express.Router();

bookingsRouter
    .route("/")
    .get(getAllBookings)
    .post(createBooking)

bookingsRouter
    .route("/:id")
    .get(getBookingById)
    .put(updateBooking)
    .delete(deleteBooking); 

export default bookingsRouter;
