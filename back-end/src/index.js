import express from "express";
import servicesRouter from "./api/services.js";
import bookingsRouter from "./api/bookings.js";
import "dotenv/config";
import { connectDB } from "./persistence/db.js";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware.js";


const app = express();

app.use(express.json());

connectDB()

app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingsRouter);

app.use(globalErrorHandlingMiddleware);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Webservice is listening on port ${PORT}`);
});