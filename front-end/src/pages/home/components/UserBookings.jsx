import React, { useState, useEffect } from "react";
import { getBookingsForUser, fetchUserBookings, deleteBooking } from "@/lib/api/bookings";
import BookingCard from "@/components/shared/booking-card";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/clerk-react";
const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.publicMetadata?.role === "admin";


  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchUserBookings();
        setBookings(data);
        console.log("Bookings:", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    

    loadBookings();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit booking with ID:", id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });
  
    if (result.isConfirmed) {
      try {
        await deleteBooking(id);
  
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
  
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Booking deleted successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to delete booking:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete booking. Please try again.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };


  if (isLoading) {
    return (
      <section className="py-8">
        <div className="py-8 flex items-center justify-center">
          <div className="py-8">
            <div className="flex justify-center items-center">
              <div className="w-12 h-12 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
            </div>
            <p className="text-black mt-4">Loading, please wait...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="py-7">
      <h2 className="py-6">Your Bookings</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4 w-full mx-auto">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              isAdmin={isAdmin}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center col-span-full">
            <p className="text-gray-500">You don't have any bookings yet.</p>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default UserBookings;
