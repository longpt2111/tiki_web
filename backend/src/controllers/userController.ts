import { Request, Response } from "express";
import * as UserService from "../services/userService";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
