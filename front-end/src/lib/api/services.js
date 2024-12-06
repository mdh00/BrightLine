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