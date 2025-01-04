import SimulationResultTable from "../NewSimulation/SimulationResultTable";
import Button from "../Button/Button";

import { SimulationResultData } from "../../services/Simulation";

function SimulationResult({
  simulationResult,
  prevStep,
  handleSaveSimulation,
}: {
  simulationResult: SimulationResultData;
  prevStep: () => void;
  handleSaveSimulation: () => void;
}) {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col lg:w-1/2 gap-5">
        <div>
          <h2 className="text-headline4 lg:text-headline3 font-bold">
            Simulation Completed
          </h2>
        </div>
        <hr />
        <div className="flex flex-col gap-5">
          <p className="text-paragraph">This is your simulation result:</p>
          <SimulationResultTable simulation={simulationResult} />
        </div>
        <div className="flex flex-col lg:flex-row justify-center">
          <Button
            className="w-full lg:w-3/4 h-14 rounded-full bg-black text-white hover:text-black hover:bg-primary_green"
            title="Go back"
            onclick={prevStep}
          />
          <Button
            className="w-full lg:w-3/4 h-14 rounded-full bg-black text-white hover:text-black hover:bg-primary_green"
            title="Save simulation"
            onclick={handleSaveSimulation}
          />
        </div>
      </div>
    </div>
  );
}

export default SimulationResult;
