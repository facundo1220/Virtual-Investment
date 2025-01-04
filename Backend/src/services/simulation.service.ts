import { AppDataSource } from "../config/data-source";
import { PaymentTerm, Simulation } from "../models/Simulation";
import { User } from "../models/User";

export class SimulationService {
  static async createSimulation(data: {
    userId: string;
    amount: number;
    paymentTerm: PaymentTerm;
    fromDate: string;
    toDate: string;
    interestRate: number;
    netInvestmentReturn: number;
    returnPerPeriod: number;
    withholdingTax: number;
    finalInvestmentValue: number;
  }) {
    const {
      userId,
      amount,
      paymentTerm,
      fromDate,
      toDate,
      interestRate,
      netInvestmentReturn,
      returnPerPeriod,
      withholdingTax,
      finalInvestmentValue,
    } = data;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    const simulationRepository = AppDataSource.getRepository(Simulation);

    const simulation = new Simulation();
    simulation.amount = amount;
    simulation.paymentTerm = paymentTerm;
    simulation.fromDate = new Date(fromDate);
    simulation.toDate = new Date(toDate);
    simulation.interestRate = interestRate;
    simulation.netInvestmentReturn = netInvestmentReturn;
    simulation.returnPerPeriod = returnPerPeriod;
    simulation.withholdingTax = withholdingTax;
    simulation.finalInvestmentValue = finalInvestmentValue;
    simulation.user = user;

    return await simulationRepository.save(simulation);
  }

  static async getSimulationsByUser(userId: string) {
    const simulationRepository = AppDataSource.getRepository(Simulation);

    return await simulationRepository.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });
  }

  static async updateSimulation(
    id: string,
    updates: Partial<{
      amount: number;
      paymentTerm: string;
      fromDate: string;
      toDate: string;
      interestRate: number;
      netInvestmentReturn: number;
      returnPerPeriod: number;
      withholdingTax: number;
      finalInvestmentValue: number;
    }>
  ) {
    const simulationRepository = AppDataSource.getRepository(Simulation);
    const simulation = await simulationRepository.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!simulation) {
      throw new Error("Simulation not found");
    }

    Object.assign(simulation, {
      amount: updates.amount ?? simulation.amount,
      paymentTerm: updates.paymentTerm ?? simulation.paymentTerm,
      fromDate: updates.fromDate
        ? new Date(updates.fromDate)
        : simulation.fromDate,
      toDate: updates.toDate ? new Date(updates.toDate) : simulation.toDate,
      interestRate: updates.interestRate
        ? updates.interestRate
        : simulation.interestRate,
      netInvestmentReturn:
        updates.netInvestmentReturn ?? simulation.netInvestmentReturn,
      returnPerPeriod: updates.returnPerPeriod ?? simulation.returnPerPeriod,
      withholdingTax: updates.withholdingTax ?? simulation.withholdingTax,
      finalInvestmentValue:
        updates.finalInvestmentValue ?? simulation.finalInvestmentValue,
    });

    return await simulationRepository.save(simulation);
  }

  static async deleteSimulation(id: string) {
    const simulationRepository = AppDataSource.getRepository(Simulation);
    const simulation = await simulationRepository.findOne({ where: { id } });

    if (!simulation) {
      throw new Error("Simulation not found");
    }

    return await simulationRepository.remove(simulation);
  }
}
