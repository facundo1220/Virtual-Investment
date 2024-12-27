import * as express from "express";
import { authentification } from "../middleware/auth.middleware";
import { SimulationController } from "../controllers/Simulation.controller";
import { authorization } from "../middleware/authorization.middleware";
import { handleValidationErrors } from "../middleware/validation.middleware";
import {
  validateCreateSimulation,
  validateGenerateSimulation,
  validateUpdateSimulation,
} from "../validators/Simulation.validation";

const Router = express.Router();

Router.get(
  "/simulation/:userId",
  authentification,
  authorization(["user", "admin"]),
  SimulationController.getSimulations
);
Router.post(
  "/simulation/generate",
  authentification,
  authorization(["user", "admin"]),
  validateGenerateSimulation,
  handleValidationErrors,
  SimulationController.generateSimulation
);
Router.post(
  "/simulation/create",
  authentification,
  authorization(["user", "admin"]),
  validateCreateSimulation,
  handleValidationErrors,
  SimulationController.saveSimulation
);
Router.put(
  "/simulation/update/:id",
  authentification,
  authorization(["user", "admin"]),
  validateUpdateSimulation,
  handleValidationErrors,
  SimulationController.updateSimulations
);
Router.delete(
  "/simulation/delete/:id",
  authentification,
  authorization(["user", "admin"]),
  SimulationController.deleteSimulations
);

export { Router as simulationRoute };
