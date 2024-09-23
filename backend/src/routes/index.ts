import { Express } from "express";
import userRouter from "./userRouter";

const routes = (app: Express) => {
  app.use("/api/user", userRouter);
};

export default routes;
