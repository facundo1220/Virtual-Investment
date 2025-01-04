import { useFormContext } from "react-hook-form";

function EditSimulationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <form className="flex flex-col gap-5">
      <div>
        <label className="text-small font-semibold px-5">Amount: </label>
        <input
          type="number"
          {...register("value")}
          placeholder="Enter the value"
        />
        {errors.value && typeof errors.value.message === "string" && (
          <span className="text-red-500 px-5 text-small">
            {errors.value.message}
          </span>
        )}
      </div>

      <div>
        <label className="text-small font-semibold px-5">From Date:</label>
        <input type="date" {...register("fromDate")} />
        {errors.fromDate && typeof errors.fromDate.message === "string" && (
          <span className="text-red-500 px-5 text-small">
            {errors.fromDate.message}
          </span>
        )}
      </div>

      <div>
        <label className="text-small font-semibold px-5">To Date: </label>
        <input type="date" {...register("toDate")} />
        {errors.toDate && typeof errors.toDate.message === "string" && (
          <span className="text-red-500 px-5 text-small">
            {errors.toDate.message}
          </span>
        )}
      </div>

      <div>
        <label className="text-small font-semibold px-5">Payment Type:</label>
        <select {...register("paymentType")}>
          <option value="monthly">Monthly</option>
          <option value="anual">Anual</option>
        </select>
      </div>
    </form>
  );
}

export default EditSimulationForm;
