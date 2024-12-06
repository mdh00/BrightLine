import Booking from "../persistence/Entities/bookings.js";
import { BookingDTO } from "./dto/bookings.js";
import ValidationError from "../domain/errors/validation-error.js";
import NotFoundError from "../domain/errors/not-found-error.js";

export const getAllBookings = async (req, res, next) => {
  try{
    const allbookings = await Booking.find()
    .populate("service", ["name"])
    .exec();
    return res.status(200).json(allbookings);
  } catch (error) {
    next(error);
  }

};

export const createBooking = async (req, res, next) => {
  try{
    const booking = BookingDTO.safeParse(req.body);
    if(!booking.success){
      throw new ValidationError(booking.error);
    }
    await Booking.create({...booking.data, userId: "123"});
    return res.status(201).send("Booking created successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try{
    const bookingId = req.params.id;;

    const booking = await Booking.findById(bookingId)

    if (booking === null) {
      throw new NotFoundError("Booking not found");
    }
    console.log("Booking:", booking);
    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
}


export const updateBooking = async (req, res, next) => {
  try{
    const bookingId = req.params.id;
    const booking = BookingDTO.safeParse(req.body);
    if(!booking.success){
      throw new ValidationError(booking.error);
    }
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, booking.data, {new: true});
    if (updatedBooking === null) {
      throw new NotFoundError("Booking not found");
    }
    return res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
}

export const deleteBooking = async (req, res, next) => {
  try{
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (deletedBooking === null) {
      throw new NotFoundError("Booking not found");
    }
    return res.status(200).send("Booking deleted successfully");
  } catch (error) {
    next(error);
  }
} 