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
      <div className="md:w-1/2 flex flex-col gap-5">
        <div>
          <h2 className="md:text-headline3 text-headline4 font-bold">
            Simulation Completed
          </h2>
        </div>
        <hr />
        <div className="flex flex-col gap-5">
          <p className="text-paragraph">This is your simulation result:</p>
          <SimulationResultTable simulation={simulationResult} />
        </div>
        <div className="flex flex-col md:flex-row justify-center">
          <Button
            className="bg-black rounded-full h-14 text-white hover:text-black hover:bg-[#f3ff6e] w-full lg:w-3/4"
            title="Go back"
            onclick={prevStep}
          />
          <Button
            className="bg-black rounded-full h-14 text-white hover:text-black hover:bg-[#f3ff6e] w-full lg:w-3/4"
            title="Save simulation"
            onclick={handleSaveSimulation}
          />
        </div>
      </div>
    </div>
  );
}

export default SimulationResult;
