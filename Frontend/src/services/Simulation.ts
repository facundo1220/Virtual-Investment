import envConfig from "../config/envConfig";
import { authenticatedFetch } from "./authenticatedFetch";

export interface SimulationData {
  id?: string;
  amount: number;
  paymentTerm: string;
  fromDate: string;
  toDate: string;
  userId?: string;
}

export interface SimulationResultData {
  id?: string;
  amount: number;
  paymentTerm: string;
  fromDate: string;
  toDate: string;
  userId?: string;
  interestRate: number;
  netInvestmentReturn: number;
  returnPerPeriod: number;
  withholdingTax: number;
  finalInvestmentValue: number;
}

export interface SimulationsTableData {
  data: SimulationResultData[];
}

const API_BASE_URL = envConfig.API_BASE_URL;

export const generateSimulation = async ({
  amount,
  paymentTerm,
  fromDate,
  toDate,
}: SimulationData) => {
  const fromDateUTC = new Date(fromDate).toISOString();
  const toDateUTC = new Date(toDate).toISOString();

  const jsonData = {
    amount,
    paymentTerm,
    fromDate: fromDateUTC,
    toDate: toDateUTC,
  };

  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/simulation/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    }
  );

  const responseJson = await response.json();

  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";

    for (const key in responseJson) {
      errorMessage = responseJson[key];
    }

    throw new Error(errorMessage);
  }

  return responseJson;
};

export const saveSimulation = async (simulationData: SimulationData) => {
  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/simulation/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(simulationData),
    }
  );

  const responseJson = await response.json();

  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";

    for (const key in responseJson) {
      errorMessage = responseJson[key];
    }

    throw new Error(errorMessage);
  }

  return responseJson;
};

export const getSimulations = async (userId: string | null) => {
  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/simulation/${userId}`,
    {
      method: "GET",
    }
  );

  const responseJson = await response.json();

  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";

    for (const key in responseJson) {
      errorMessage = responseJson[key];
    }

    throw new Error(errorMessage);
  }

  const data: SimulationResultData[] = responseJson.map(
    (item: SimulationResultData) => ({
      id: item.id,
      userId: item.userId,
      amount: item.amount,
      fromDate: item.fromDate,
      toDate: item.toDate,
      paymentTerm: item.paymentTerm,
      interestRate: item.interestRate,
      netInvestmentReturn: item.netInvestmentReturn,
      returnPerPeriod: item.returnPerPeriod,
      withholdingTax: item.withholdingTax,
      finalInvestmentValue: item.finalInvestmentValue,
    })
  );

  const tableData: SimulationsTableData = {
    data,
  };

  return tableData;
};

export const updateSimulation = async (
  simulationId: string,
  updatedData: SimulationData
) => {
  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/simulation/update/${simulationId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );

  const responseJson = await response.json();

  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";

    for (const key in responseJson) {
      errorMessage = responseJson[key];
    }

    throw new Error(errorMessage);
  }

  return responseJson;
};

export const deleteSimulation = async (simulationId: string | undefined) => {
  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/simulation/delete/${simulationId}`,
    {
      method: "DELETE",
    }
  );

  const responseJson = await response.json();

  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";

    for (const key in responseJson) {
      errorMessage = responseJson[key];
    }

    throw new Error(errorMessage);
  }

  return responseJson;
};
