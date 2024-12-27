import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";
import { encrypt } from "../helpers/encrypt";

export class AuthService {
  static async login(email: string, password: string) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return { error: "User not found" };
      }

      const isPasswordValid = encrypt.comparepassword(user.password, password);
      if (!isPasswordValid) {
        return { error: "Invalid password" };
      }

      const token = encrypt.generateToken({ id: user.id });
      return { user, token, error: null };
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }

  static async getProfile(userId: string) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: userId } });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }
}
