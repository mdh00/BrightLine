//User API
export const createBooking = async (data) => {
    const token = await window.Clerk?.session?.getToken();

    const res = await fetch("http://localhost:8000/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
}  

export const getBookingsForUser = async () => {
    const token = await window.Clerk?.session?.getToken();
    userId = await window.Clerk?.session?.getUser();

    const res = await fetch("http://localhost:8000/api/bookings/userId", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data;
};

export const getBookingById = async (id) => {
    const token = await window.Clerk?.session?.getToken();

    const res = await fetch(`http://localhost:8000/api/bookings/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data;
};

export const updateBooking = async (id, data) => {
    const token = await window.Clerk?.session?.getToken();

    const res = await fetch(`http://localhost:8000/api/bookings/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
};

export const deleteBooking = async (id) => {
    const token = await window.Clerk?.session?.getToken();

    const res = await fetch(`http://localhost:8000/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}


//Admin API
const getAllBookings = async () => {
    const token = await window.Clerk?.session?.getToken();

    const res = await fetch("http://localhost:8000/api/bookings", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data;
};


