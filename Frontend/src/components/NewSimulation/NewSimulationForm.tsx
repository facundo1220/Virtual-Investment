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
    <div className="flex justify-center items-center flex-col h-full gap-10">
      <h1 className="text-headline4 lg:text-headline3 font-bold">
        Enter Values
      </h1>
      <form
        className="flex flex-col lg:w-1/2 gap-5"
        onSubmit={handleSubmit(handleSimulation)}
      >
        <div>
          <label className="text-small px-5">Amount: </label>
          <input
            type="number"
            {...register("value")}
            placeholder="Enter the value"
          />
          {errors.value && (
            <span className="text-red-500 px-5 text-small">
              {errors.value.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-small px-5">From Date:</label>
          <input type="date" {...register("fromDate")} />
          {errors.fromDate && (
            <span className="text-red-500 px-5 text-small">
              {errors.fromDate.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-small px-5">To Date: </label>
          <input type="date" {...register("toDate")} />
          {errors.toDate && (
            <span className="text-red-500 px-5 text-small">
              {errors.toDate.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-small px-5">Payment Type:</label>
          <select {...register("paymentType")}>
            <option value="monthly">Monthly</option>
            <option value="anual">Anual</option>
          </select>
        </div>

        <div className="flex justify-center flex-col lg:flex-row w-full">
          <Button
            className="w-full lg:w-3/4 h-14 rounded-full bg-black text-white hover:text-black hover:bg-primary_green"
            title="Go back"
            onclick={prevStep}
          />
          <Button
            className="w-full lg:w-3/4 h-14 rounded-full bg-black text-white hover:text-black hover:bg-primary_green"
            title="View simulation"
          />
        </div>
      </form>
    </div>
  );
}

export default NewSimulationForm;
