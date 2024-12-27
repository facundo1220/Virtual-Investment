import { InvestmentRange } from "../models/InvestmentRange"; // Adjust path based on your structure
import { AppDataSource } from "../config/data-source";
import * as dotenv from "dotenv";

export interface InterestCalculationResult {
  interestRate: number;
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
    const { WITHHOLDINGTASK } = process.env;

    const from = new Date(fromDate);
    const to = new Date(toDate);

    const days = Math.ceil(
      (to.getTime() - from.getTime()) / (1000 * 3600 * 24)
    );

    const interestRate = await this.calculateInvestmentRangeRate(days, amount);

    const annualRate = interestRate / 100;

    const returnPerPeriod =
      period === "monthly" ? (annualRate / 12) * amount : annualRate * amount;

    const withholdingTax = returnPerPeriod * Number(WITHHOLDINGTASK);

    const netInvestmentReturn = returnPerPeriod - withholdingTax;

    const finalInvestmentValue = amount + netInvestmentReturn;

    return {
      interestRate,
      netInvestmentReturn: parseFloat(netInvestmentReturn.toFixed(3)),
      returnPerPeriod: parseFloat(returnPerPeriod.toFixed(3)),
      withholdingTax: parseFloat(withholdingTax.toFixed(3)),
      finalInvestmentValue: parseFloat(finalInvestmentValue.toFixed(3)),
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
    } else {
      return 0;
    }
  }
}
