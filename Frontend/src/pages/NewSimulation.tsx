import { useState } from "react";
import {
  generateSimulation,
  saveSimulation,
  SimulationResultData,
} from "../services/Simulation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProcessInfo from "../components/NewSimulation/ProcessInfo";
import NewSimulationForm from "../components/NewSimulation/NewSimulationForm";
import SimulationResult from "../components/NewSimulation/SimulationResult";

interface FormData {
  value: number;
  fromDate: string;
  toDate: string;
  paymentType: string;
}

function NewSimulation() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [simulationResult, setSimulationResult] =
    useState<SimulationResultData>();

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSimulation = async (data: FormData) => {
    const { value, fromDate, toDate, paymentType } = data;

    try {
      const simulation = await generateSimulation({
        amount: value,
        paymentTerm: paymentType,
        fromDate,
        toDate,
      });

      setSimulationResult(simulation);
      nextStep();
    } catch (error) {
      console.error("Error generating simulation:", error);
    }
  };

  const handleSaveSimulation = async () => {
    try {
      if (simulationResult) {
        Object.assign(simulationResult, {
          userId: localStorage.getItem("user_id"),
        });

        await saveSimulation(simulationResult);
        toast.success("Simulation saved successfully!");
        navigate("/Simulations");
      }
    } catch (error) {
      console.error("Error saving simulation:", error);
    }
  };

  return (
    <div className="md:p-5 w-full">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="h-full w-full rounded-xl lg:px-14 md:px-5 px-2 py-5">
          {step === 1 && <ProcessInfo nextStep={nextStep} />}

          {step === 2 && (
            <NewSimulationForm
              prevStep={prevStep}
              handleSimulation={handleSimulation}
            />
          )}

          {step === 3 && simulationResult && (
            <SimulationResult
              prevStep={prevStep}
              simulationResult={simulationResult}
              handleSaveSimulation={handleSaveSimulation}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default NewSimulation;
