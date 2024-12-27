import { InvestmentRange } from "../models/InvestmentRange";
import { AppDataSource } from "../config/data-source";
import envConfig from '../config/EnvConfig'

export interface InterestCalculationResult {
  interestRate: number;
  investmentReturn: number;
  netInvestmentReturn: number;
  returnPerPeriod: number;
  withholdingTax: number;
  finalInvestmentValue: number;
}

export class InterestRateService {
  static async calculateInterestRate(
    fromDate: string,
    toDate: string,
    amount: number,
    period: "monthly" | "anual"
  ): Promise<InterestCalculationResult> {
    const WITHHOLDING_TASK = envConfig.WITHHOLDING_TASK;

    const from = new Date(fromDate);
    const to = new Date(toDate);
    const days = Math.ceil(
      (to.getTime() - from.getTime()) / (1000 * 3600 * 24)
    );

    const interestRate = await this.calculateInvestmentRangeRate(days, amount);
    const annualRate = interestRate / 100;

    const returnPerPeriod =
      period === "monthly" ? (annualRate / 12) * amount : annualRate * amount;

    const daysRate = Math.pow(1 + annualRate, days / 360) - 1;

    const netDaysReturn = amount * daysRate
    const withholdingTax = netDaysReturn * WITHHOLDING_TASK
    const netInvestmentReturn = netDaysReturn - withholdingTax;

    const finalInvestmentValue = amount + netInvestmentReturn;

    return {
      interestRate,
      investmentReturn: parseFloat(netDaysReturn.toFixed()),
      netInvestmentReturn: parseFloat(netInvestmentReturn.toFixed()),
      returnPerPeriod: parseFloat(returnPerPeriod.toFixed()),
      withholdingTax: parseFloat(withholdingTax.toFixed()),
      finalInvestmentValue: parseFloat(finalInvestmentValue.toFixed()),
    };
  }

  private static async calculateInvestmentRangeRate(
    days: number,
    amount: number
  ): Promise<number> {
    const investmentRangeRepository =
      AppDataSource.getRepository(InvestmentRange);

    const result = await investmentRangeRepository
      .createQueryBuilder("r")
      .where(":days BETWEEN r.days_range_start AND r.days_range_end", { days })
      .andWhere(":amount BETWEEN r.amount_range_start AND r.amount_range_end", {
        amount,
      })
      .getOne();

    if (result) {
      return Number(result.percentage);
    }
    return 0;

  }
}
