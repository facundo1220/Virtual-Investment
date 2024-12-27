import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { User } from "../models/User";
import { Simulation } from "../models/Simulation";
import { InvestmentRange } from "../models/InvestmentRange";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  //synchronize: NODE_ENV === "dev" ? true : false,
  //logging: NODE_ENV === "dev" ? true : false,
  entities: [User, Simulation, InvestmentRange],
  //migrations: ["/Users/jorge.facundo/Desktop/FullStack - Jorge Facundo/Backend/src/migrations/users.ts"],
  subscribers: [],
});
