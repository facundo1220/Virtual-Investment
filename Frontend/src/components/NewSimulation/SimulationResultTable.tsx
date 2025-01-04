import { SimulationResultData } from "../../services/Simulation";
import { formatDate, formatCurrency, formatTerm } from "../../utils/Formats";

const fieldNames: Record<keyof SimulationResultData, string> = {
  id: "ID",
  userId: "User ID",
  fromDate: "Start Date",
  toDate: "End Date",
  amount: "Amount",
  interestRate: "Interest Rate",
  paymentTerm: "Payment Term",
  returnPerPeriod: "Return Per Period",
  withholdingTax: "Withholding Tax",
  netInvestmentReturn: "Net Investment Return",
  finalInvestmentValue: "Final Investment Value",
};

function SimulationResultTable({
  simulation,
}: {
  simulation: SimulationResultData;
}) {
  const renderRows = () => {
    const filteredFieldNames = Object.keys(fieldNames).filter(
      (key) => key !== "id" && key !== "userId"
    );

    return filteredFieldNames.map((key) => {
      const fieldName = fieldNames[key as keyof SimulationResultData];
      const value = simulation[key as keyof SimulationResultData];

      let formattedValue;

      if (key === "fromDate" || key === "toDate") {
        formattedValue = formatDate(value as string);
      } else if (key === "interestRate") {
        formattedValue = value + "%";
      } else if (key === "paymentTerm") {
        formattedValue = formatTerm(value as string);
      } else {
        formattedValue = formatCurrency(value as number);
      }

      return (
        <div className="col-span-1 border-b pb-3" key={key}>
          <div>
            <p>{fieldName}</p>
            <p className="font-bold">{formattedValue}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {renderRows()}
      </div>
    </div>
  );
}

export default SimulationResultTable;
