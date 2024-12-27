import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import envConfig from '../config/EnvConfig'

const JWT_SECRET = envConfig.JWT_SECRET;
export class encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: { id: string }) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}
