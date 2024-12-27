import "reflect-metadata";
import { DataSource } from "typeorm";
import envConfig from "./EnvConfig";
import { User } from "../models/User";
import { Simulation } from "../models/Simulation";
import { InvestmentRange } from "../models/InvestmentRange";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_DATABASE,
  synchronize: envConfig.NODE_ENV === "dev" ? false : false,
  logging: envConfig.NODE_ENV === "dev" ? false : false,
  entities: [User, Simulation, InvestmentRange],
  subscribers: [],
});
