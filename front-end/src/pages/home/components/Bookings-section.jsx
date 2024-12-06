import React, { useState, useEffect } from "react";
import { getBookingsForUser, fetchUserBookings } from "@/lib/api/bookings";

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const loadBookings = async () => {
        try {
          const data = await fetchUserBookings();
          setBookings(data);
        } catch (err) {
          setError(err.message);
        }
      };
  
      loadBookings();
    }, []);
  
    return (
      <div>
        <h1>Your Bookings</h1>
        {error && <p>Error: {error}</p>}
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              {booking.title} - {new Date(booking.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default UserBookings;