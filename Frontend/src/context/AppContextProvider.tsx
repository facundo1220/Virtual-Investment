import { AppContext } from "./AppContext";
import { SimulationsTableData } from "../services/Simulation";
import { useState } from "react";

interface props {
  children: JSX.Element | JSX.Element[];
}

export const AppProvider = ({ children }: props) => {
  const [Simulations, setSimulations] = useState<SimulationsTableData | null>(
    null
  );

  return (
    <AppContext.Provider value={{ Simulations, setSimulations }}>
      {children}
    </AppContext.Provider>
  );
};
