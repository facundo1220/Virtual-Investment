import { Request, Response } from "express";
import { AuthService } from "../services/Auth.service";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { user, token, error } = await AuthService.login(email, password);
      if (error) {
        res.status(404).json({ message: error });
        return
      }
      res.status(200).json({ message: "Login successful", user, token });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req: Request, res: Response) {
    try {
      if (!req["currentUser"]) {
        res.status(401).json({ message: "Unauthorized" });
        return
      }

      const user = await AuthService.getProfile(req["currentUser"].id);
      res.status(200).json({ ...user, password: undefined });
      return
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static validateToken(req: Request, res: Response) {
    try {
      if (!req["currentUser"]) {
        res.status(401).json({ message: "Unauthorized" });
        return
      }
      res.status(200).json({ message: "Token is valid" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
