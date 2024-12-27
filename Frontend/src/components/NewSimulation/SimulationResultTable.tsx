import { SimulationResultData } from "../../services/Simulation";

const fieldNames: Record<keyof SimulationResultData, string> = {
  id: "ID",
  userId: "User ID",
  amount: "Amount",
  fromDate: "Start Date",
  toDate: "End Date",
  paymentTerm: "Payment Term",
  interestRate: "Interest Rate",
  netInvestmentReturn: "Net Investment Return",
  returnPerPeriod: "Return Per Period",
  withholdingTax: "Withholding Tax",
  finalInvestmentValue: "Final Investment Value",
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

function SimulationResultTable({
  simulation,
}: {
  simulation: SimulationResultData;
}) {
  const renderRows = () => {
    return Object.entries(simulation).map(([key, value]) => {
      const fieldName = fieldNames[key as keyof SimulationResultData];

      const formattedValue =
        key === "fromDate" || key === "toDate"
          ? formatDate(value as string)
          : value;

      return (
        <div className="col-span-1" key={key}>
          <div>
            <p>{fieldName}</p>
            <p className="font-bold">{formattedValue}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {renderRows()}
      </div>
    </div>
  );
}

export default SimulationResultTable;
