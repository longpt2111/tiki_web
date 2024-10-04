import { Request, Response } from "express";
import { logEvents } from "./logEvents";

const errorHandler = (err: Error, req: Request, res: Response) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.error("Error stack", err.stack);

  // const statusCode = err.statusCode || 500;

  // return res.status(statusCode).json({
  //   message: err.message || "Something went wrong!",
  //   status: statusCode,
  // });
};

export default errorHandler;
