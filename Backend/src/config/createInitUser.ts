import { encrypt } from "../helpers/encrypt"
import { User } from "../models/User"
import { AppDataSource } from "../config/data-source";
import envConfig from "../config/EnvConfig";

export async function createInitUser() {
    const userRepository = AppDataSource.getRepository(User);

    const password = envConfig.USER_PASS;
    const hashedPassword = await encrypt.encryptpass(password)

    const user = new User();
    user.name = envConfig.USER_NAME;
    user.email = envConfig.USER_EMAIL;
    user.password = hashedPassword;
    user.role = "admin";

    await userRepository.save(user);
}