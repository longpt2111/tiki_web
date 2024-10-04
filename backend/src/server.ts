import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect";
import mongoose from "mongoose";
import routes from "./routes";
import logger from "./middlewares/logEvents";
import credentials from "./middlewares/credentials";
import cors from "cors";
import corsOptions from "./config/corsOptions";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 3001;

// Use env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for json
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Routes
routes(app);

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
