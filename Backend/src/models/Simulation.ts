import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

export enum PaymentTerm {
  MONTHLY = "monthly",
  ANUAL = "anual",
}

@Entity({ name: "simulations" })
export class Simulation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "float", nullable: false })
  amount: number;

  @Column({
    type: "enum",
    enum: PaymentTerm,
  })
  paymentTerm: PaymentTerm;

  @Column({ type: "date" })
  fromDate: Date;

  @Column({ type: "date" })
  toDate: Date;

  @Column({ type: "float" })
  interestRate: number;

  @Column({ type: "float" })
  netInvestmentReturn: number;

  @Column({ type: "float" })
  returnPerPeriod: number;

  @Column({ type: "float" })
  withholdingTax: number;

  @Column({ type: "float" })
  finalInvestmentValue: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.simulations, { onDelete: "CASCADE" })
  user: User;
}
