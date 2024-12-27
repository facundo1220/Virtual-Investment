import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("investment_ranges")
export class InvestmentRange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  days_range_start: number;

  @Column("int")
  days_range_end: number;

  @Column("decimal")
  amount_range_start: number;

  @Column("decimal", { nullable: true })
  amount_range_end: number | null;

  @Column("decimal")
  percentage: number;
}
