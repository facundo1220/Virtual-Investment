import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import envConfig from '../config/EnvConfig'

export const authentification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: "Unauthorized: Missing authorization header" });
    return
  }

  const token = header.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized: Missing token" });
    return
  }

  try {
    const decode = jwt.verify(token, envConfig.JWT_SECRET);
    if (!decode) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
      return
    }
    req["currentUser"] = decode;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(400).json({ message: "Invalid token format or signature" });
    return
  }
};
