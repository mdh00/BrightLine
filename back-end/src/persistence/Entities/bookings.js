import mongoose from 'mongoose';
const {Schema} = mongoose;

const BookingSchema = new Schema({
    userId: {
        type: String,
        required: true,
      },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    },
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;