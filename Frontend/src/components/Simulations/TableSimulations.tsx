import { Tooltip } from "react-tooltip";
import { CiCircleInfo } from "react-icons/ci";
import { CiTrash, CiEdit } from "react-icons/ci";
import { formatDate, formatCurrency, formatTerm } from "../../utils/Formats";

import { SimulationResultData } from "../../services/Simulation";

interface TableSimulationsProps {
  data: SimulationResultData[];
  openModal: (product: SimulationResultData, action: "edit" | "delete") => void;
}

function TableSimulations({ data, openModal }: TableSimulationsProps) {
  const columnNames = [
    { name: "Start Date", tooltip: "Start date of the simulation" },
    { name: "End Date", tooltip: "End date of the simulation" },
    { name: "Amount", tooltip: "Investment amount" },
    { name: "Rate", tooltip: "Annual interest rate" },
    { name: "Term", tooltip: "Payment period" },
    { name: "Return", tooltip: "Return for each period" },
    { name: "Tax", tooltip: "Withholding Tax" },
    { name: "Net Return", tooltip: "Return after taxes and fees" },
    { name: "Final Value", tooltip: "Total value after return" },
    { name: "", tooltip: "" },
  ];

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-xs text-left">
        <thead className="uppercase">
          <tr className="border whitespace-nowrap">
            {columnNames.map((column, index) => (
              <th key={index} className="px-6 py-3">
                <div className="flex gap-2 items-center">
                  {column.name}
                  {column.tooltip && (
                    <span
                      data-tooltip-id="table-tooltip"
                      data-tooltip-content={column.tooltip}
                      data-tooltip-place="top"
                    >
                      <CiCircleInfo size={20} />
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className="text-black bg-white border-b" key={item.id}>
              <td className="px-6 py-3">{formatDate(item.fromDate)}</td>
              <td className="px-6 py-3">{formatDate(item.toDate)}</td>
              <td className="px-6 py-3">{formatCurrency(item.amount)}</td>
              <td className="px-6 py-3">{item.interestRate}%</td>
              <td className="px-6 py-3">{formatTerm(item.paymentTerm)}</td>
              <td className="px-6 py-3">
                {formatCurrency(item.returnPerPeriod)}
              </td>
              <td className="px-6 py-3">
                {formatCurrency(item.withholdingTax)}
              </td>
              <td className="px-6 py-3">
                {formatCurrency(item.netInvestmentReturn)}
              </td>
              <td className="px-6 py-3">
                {formatCurrency(item.finalInvestmentValue)}
              </td>
              <td>
                <div className="flex gap-3">
                  <CiTrash
                    size={20}
                    onClick={() => openModal(item, "delete")}
                  />
                  <CiEdit size={20} onClick={() => openModal(item, "edit")} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Tooltip id="table-tooltip" />
    </div>
  );
}

export default TableSimulations;
