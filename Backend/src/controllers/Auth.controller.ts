import { Request, Response } from "express";
import { AuthService } from "../services/Auth.service";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(500).json({ message: "Email and password required" });
      }

      const { user, token, error } = await AuthService.login(email, password);
      if (error) {
        res.status(404).json({ message: error });
      } else {
        res.status(200).json({ message: "Login successful", user, token });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req: Request, res: Response) {
    try {
      if (!req["currentUser"]) {
        res.status(401).json({ message: "Unauthorized" });
      }

      const user = await AuthService.getProfile(req["currentUser"].id);
      res.status(200).json({ ...user, password: undefined });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
