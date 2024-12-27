import * as express from "express";
import * as cors from "cors";

import { userRouter } from "./routes/user.route";
import { simulationRoute } from "./routes/simulation.route";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
app.use(express.json());
app.use(errorHandler);

const { PORT = 3000 } = process.env;

app.set("port", PORT);

app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);
app.use("/api", simulationRoute);

export default app;
