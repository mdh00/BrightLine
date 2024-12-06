import express from "express";
import servicesRouter from "./api/services.js";
import "dotenv/config";
import { connectDB } from "./persistence/db.js";

const app = express();

app.use(express.json());

connectDB()

app.use("/api/services", servicesRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Webservice is listening on port ${PORT}`);
});
