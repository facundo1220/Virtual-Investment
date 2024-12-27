import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { simulationValidationSchema } from "../../schemas/simulationSchema";

interface FormData {
  value: number;
  fromDate: string;
  toDate: string;
  paymentType: string;
}

function NewSimulationForm({
  handleSimulation,
  prevStep,
}: {
  handleSimulation: SubmitHandler<FormData>;
  prevStep: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(simulationValidationSchema),
  });

  return (
    <div className="flex justify-center items-center flex-col gap-10 h-full">
      <h1 className="text-3xl font-mono font-bold">Enter Values</h1>
      <form
        className="flex flex-col gap-5 w-1/2"
        onSubmit={handleSubmit(handleSimulation)}
      >
        <div>
          <label className="text-sm font-semibold px-5">Amount: </label>
          <input
            type="number"
            {...register("value")}
            placeholder="Enter the value"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm h-12 rounded-full w-full p-2.5 focus:outline-none focus:border-black"
          />
          {errors.value && (
            <span className="text-red-500 px-5 text-sm">
              {errors.value.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold px-5">From Date:</label>
          <input
            type="date"
            {...register("fromDate")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm h-12 rounded-full w-full p-2.5 focus:outline-none focus:border-black"
          />
          {errors.fromDate && (
            <span className="text-red-500 px-5 text-sm">
              {errors.fromDate.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold px-5">To Date: </label>
          <input
            type="date"
            {...register("toDate")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm h-12 rounded-full w-full p-2.5 focus:outline-none focus:border-black"
          />
          {errors.toDate && (
            <span className="text-red-500 px-5 text-sm">
              {errors.toDate.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold px-5">Payment Type:</label>
          <select
            {...register("paymentType")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm h-12 rounded-full w-full p-2.5 focus:outline-none focus:border-black"
          >
            <option value="monthly">Monthly</option>
            <option value="anual">Anual</option>
          </select>
        </div>

        <div className="flex flex-row w-full justify-center">
          <Button
            className="bg-black rounded-full h-14 text-white hover:text-black hover:bg-[#f3ff6e] w-full lg:w-3/4"
            title="Go back"
            onclick={prevStep}
          />
          <Button
            className="bg-black rounded-full h-14 text-white hover:text-black hover:bg-[#f3ff6e] w-full lg:w-3/4"
            title="View simulation"
          />
        </div>
      </form>
    </div>
  );
}

export default NewSimulationForm;
