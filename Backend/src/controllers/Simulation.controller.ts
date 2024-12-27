import { Request, Response } from "express";
import { SimulationService } from "../services/simulation.service";
import { InterestRateService } from "../services/interestRate.service";

export class SimulationController {
  static async saveSimulation(req: Request, res: Response) {
    try {
      const simulation = await SimulationService.createSimulation(req.body);
      res
        .status(200)
        .json({ message: "Simulation created successfully", simulation });
      return
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async generateSimulation(req: Request, res: Response) {
    const { amount, paymentTerm, fromDate, toDate } = req.body;

    try {
      const {
        interestRate,
        investmentReturn,
        netInvestmentReturn,
        returnPerPeriod,
        withholdingTax,
        finalInvestmentValue,
      } = await InterestRateService.calculateInterestRate(
        fromDate,
        toDate,
        amount,
        paymentTerm
      );

      const simulation = {
        amount,
        paymentTerm,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        interestRate,
        investmentReturn,
        netInvestmentReturn,
        returnPerPeriod,
        withholdingTax,
        finalInvestmentValue,
      };

      res.status(200).json(simulation);
      return
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async getSimulations(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const simulations = await SimulationService.getSimulationsByUser(userId);
      res.status(200).json(simulations);
      return
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateSimulations(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const updatedSimulation = await SimulationService.updateSimulation(
        id,
        req.body
      );
      res.status(200).json({
        message: "Simulation updated successfully",
        simulation: updatedSimulation,
      });
      return
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteSimulations(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await SimulationService.deleteSimulation(id);
      res.status(200).json({ message: "Simulation deleted successfully" });
      return
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
