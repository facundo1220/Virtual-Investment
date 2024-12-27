import { FaTrash, FaEdit } from "react-icons/fa";
import { SimulationResultData } from "../../services/Simulation";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

interface TableSimulationsProps {
  data: SimulationResultData[];
  openModal: (product: SimulationResultData, action: "edit" | "delete") => void;
}

function TableSimulations({ data, openModal }: TableSimulationsProps) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-white">
        <thead className="text-xs text-white uppercase bg-[#26272F]">
          <tr>
            <th className="px-6 py-3">From Date</th>
            <th className="px-6 py-3">To Date</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Payment Term</th>
            <th className="px-6 py-3">Interest Rate</th>
            <th className="px-6 py-3">Return per Period</th>
            <th className="px-6 py-3">Net Investment Return</th>
            <th className="px-6 py-3">Withholding Tax</th>
            <th className="px-6 py-3">Final Investment Value</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              className="odd:bg-white odd:text-black even:bg-gray-50 even:text-black border-b"
              key={item.id}
            >
              <td className="px-6 py-3 justify-center">
                {formatDate(item.fromDate)}
              </td>
              <td className="px-6 py-3">{formatDate(item.toDate)}</td>
              <td className="px-6 py-3">{item.amount}</td>
              <td className="px-6 py-3">{item.paymentTerm}</td>
              <td className="px-6 py-3">{item.interestRate}%</td>
              <td className="px-6 py-3">{item.returnPerPeriod}</td>
              <td className="px-6 py-3">{item.netInvestmentReturn}</td>
              <td className="px-6 py-3">{item.withholdingTax}</td>
              <td className="px-6 py-3">{item.finalInvestmentValue}</td>
              <td>
                <div className="flex gap-3">
                  <FaTrash
                    size={16}
                    onClick={() => openModal(item, "delete")}
                  />
                  <FaEdit size={16} onClick={() => openModal(item, "edit")} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSimulations;
