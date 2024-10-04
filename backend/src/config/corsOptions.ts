import allowedOrigins from "./allowedOrigins";

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};

export default corsOptions;
