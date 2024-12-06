import express from "express";
import { getAllBookings, createBooking, getBookingById, updateBooking, deleteBooking, getBookingByUserId } from "../application/bookings.js";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import AuthorizationMiddleware from "./middleware/authorization-middleware.js";

const bookingsRouter = express.Router();

bookingsRouter
    .route("/user")
    .get(ClerkExpressRequireAuth({}), getBookingByUserId);

bookingsRouter
    .route("/")
    .get(ClerkExpressRequireAuth({}), AuthorizationMiddleware, getAllBookings)
    .post(ClerkExpressRequireAuth({}), createBooking)



bookingsRouter
    .route("/:id")
    .get(getBookingById)
    .put(updateBooking)
    .delete(deleteBooking);


export default bookingsRouter;
