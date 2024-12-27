import { useState } from "react";
import {
  generateSimulation,
  saveSimulation,
  SimulationResultData,
} from "../services/Simulation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Step1 from "../components/NewSimulation/Step1";
import Step2 from "../components/NewSimulation/Step2";
import Step3 from "../components/NewSimulation/Step3";

interface FormData {
  value: string;
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
        amount: parseFloat(value),
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
    <div className="flex flex-col justify-center items-center bg-re p-5 h-full">
      <div className="h-full w-full rounded-xl lg:px-14 px-5 py-5">
        {step === 1 && <Step1 nextStep={nextStep} />}

        {step === 2 && (
          <Step2 prevStep={prevStep} handleSimulation={handleSimulation} />
        )}

        {step === 3 && simulationResult && (
          <Step3
            prevStep={prevStep}
            simulationResult={simulationResult}
            handleSaveSimulation={handleSaveSimulation}
          />
        )}
      </div>
    </div>
  );
}

export default NewSimulation;
