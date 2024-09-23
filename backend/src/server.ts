import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect";
import mongoose from "mongoose";
import routes from "./routes";
import { logger } from "./middlewares/logEvents";

const app = express();
const PORT = process.env.PORT || 3001;

// Use env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Custom middleware logger
app.use(logger);

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for json
app.use(express.json());

// Routes
routes(app);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
