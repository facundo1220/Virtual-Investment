import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";
import { encrypt } from "../helpers/encrypt";

export class UserService {
  static async signup(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOne({ where: { email } });

    if (findUser) throw new Error("User already exists");

    const encryptedPassword = await encrypt.encryptpass(password);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    user.role = role;

    await userRepository.save(user);

    const token = encrypt.generateToken({ id: user.id });

    return { token, user };
  }

  static async getUsers() {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    return users;
  }

  static async updateUser(id: string, name: string, email: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new Error("User not found");

    user.name = name;
    user.email = email;
    return await userRepository.save(user);
  }

  static async deleteUser(id: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new Error("User not found");

    await userRepository.remove(user);
  }
}
