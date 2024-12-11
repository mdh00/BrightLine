//User API
export const createBooking = async (data) => {
    const token = await window.Clerk?.session?.getToken();

    const res = await fetch("https://brightline.onrender.com/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
}  

export const getBookingsForUser = async (userId) => {
    try{
    const token = await window.Clerk?.session?.getToken();
    const user = await window.Clerk?.session?.getUser();

    if (!user || !token) {
        throw new Error("No user or token found");
    }
  

    const res = await fetch("https://brightline.onrender.com/api/bookings/users/${userId}", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch bookings");
    }
    const data = await res.json();
    return data;
}catch(err){
    console.error(err);
}
};

export const fetchUserBookings = async () => {
    try {
      const token = await window.Clerk?.session?.getToken();
      console.log("Token:", token);

      const response = await fetch("https://brightline.onrender.com/api/bookings/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
  
      return await response.json(); // Return the bookings
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error; // Propagate the error for further handling
    }
  };
  

export const getBookingById = async (id) => {
    const token = await window.Clerk?.session?.getToken();

    const res = await fetch(`https://brightline.onrender.com/api/bookings/${id}`, {
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

    const res = await fetch(`https://brightline.onrender.com/api/bookings/${id}`, {
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

    const res = await fetch(`https://brightline.onrender.com/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}


//Admin API
export const getAllBookings = async () => {
    const token = await window.Clerk?.session?.getToken();

    const res = await fetch("https://brightline.onrender.com/api/bookings", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data;
};


