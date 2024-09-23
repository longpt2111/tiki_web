import { IUser } from "../interfaces/userInterface";
import User from "../models/User";

export const createUser = async (userData: IUser): Promise<IUser> => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw error;
  }
};
