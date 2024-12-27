import { Request, Response } from "express";
import { UserService } from "../services/User.service";

export class UserController {
  static async signup(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      const { token, user } = await UserService.signup(
        name,
        email,
        password,
        role
      );
      res
        .status(200)
        .json({ message: "User created successfully", token, user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating user", error: error.message });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const data = await UserService.getUsers();
      res.status(200).json({ data });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching users", error: error.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const user = await UserService.updateUser(id, name, email);
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating user", error: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting user", error: error.message });
    }
  }
}
