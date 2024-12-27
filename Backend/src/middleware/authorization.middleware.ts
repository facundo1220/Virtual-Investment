import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { id: req["currentUser"].id },
    });
    if (!roles.includes(user.role)) {
      res.status(403).json({ message: "Forbidden" });
      return
    }
    next();
  };
};
