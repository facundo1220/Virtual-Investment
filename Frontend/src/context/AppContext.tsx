import { createContext } from "react";
import { SimulationsTableData } from "../services/Simulation";

export type AppContextProps = {
  Simulations: SimulationsTableData | null;
  setSimulations: React.Dispatch<
    React.SetStateAction<SimulationsTableData | null>
  >;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
