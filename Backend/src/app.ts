import * as express from "express";
import * as cors from "cors";

import { userRouter } from "./routes/user.route";
import { simulationRoute } from "./routes/simulation.route";
import { errorHandler } from "./middleware/error.middleware";

import envConfig from "./config/EnvConfig";

const app = express();
app.use(express.json());

const PORT = envConfig.PORT;

app.set("port", PORT);

app.use(cors());

app.use("/auth", userRouter);
app.use("/api", simulationRoute);

app.use(errorHandler);

export default app;
