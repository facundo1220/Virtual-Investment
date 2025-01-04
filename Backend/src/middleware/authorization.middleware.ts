import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { id: req["currentUser"].id },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return
    }
    if (!roles.includes(user.role)) {
      res.status(403).json({ message: "Forbidden" });
      return
    }
    next();
  };
};
