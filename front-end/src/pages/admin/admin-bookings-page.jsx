import BookingCard from "@/components/shared/booking-card";
import { useEffect, useState } from "react";
import { getAllBookings, deleteBooking } from "@/lib/api/bookings";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AddService from "./add-service";
import Swal from "sweetalert2";


function AdminBookings() {
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getAllBookings().then((data) => {
            setIsError(false);
            setBookings(data);
            console.log(data);
        }).catch((error) => {
            setIsError(true);
            setError(error);
        })
            .finally(() => setIsLoading(false));
    }, []);

  

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

      // Remove the booking from the state
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Booking deleted successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to delete booking:", error);

      // Show error alert
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

      
    
    
        const handleEdit = async (booking) => {
        try {
          await updateBooking(booking._id, booking);
          alert("Booking updated successfully!");
        } catch (error) {
          console.error("Failed to update booking:", error);
        }
        };
    return (
        <><h2 className="text-center mb-7">Admin Dashboard</h2>

            <AddService />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-4 w-full mx-auto">
                {bookings.map((booking) => {
                    return (
                        <BookingCard
                            key={booking._id}
                            booking={booking}
                            isAdmin={true}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    );
                })}
            </div></>
    )
}


export default AdminBookings;