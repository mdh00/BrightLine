export const getServices = async () => {
    
const res = await fetch("http://localhost:8000/api/services", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
});
    const data = await res.json();
    return data;
};

export const createService = async (data) => {
    const token = await window.Clerk?.session?.getToken();

    const res = await fetch("http://localhost:8000/api/services", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
}