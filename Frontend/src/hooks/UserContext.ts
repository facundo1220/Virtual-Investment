import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const useAppContext = () => {
  const { Simulations, setSimulations } = useContext(AppContext);

  return {
    Simulations,
    setSimulations,
  };
};
