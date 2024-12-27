import { useFormContext } from "react-hook-form";

function EditSimulationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <form>
      <div>
        <label className="text-sm font-semibold px-5">Amount: </label>
        <input
          type="number"
          {...register("value")}
          placeholder="Enter the value"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm h-12 rounded-full w-full p-2.5 focus:outline-none focus:border-black"
        />
        {errors.value && typeof errors.value.message === "string" && (
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
        {errors.fromDate && typeof errors.fromDate.message === "string" && (
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
        {errors.toDate && typeof errors.toDate.message === "string" && (
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
    </form>
  );
}

export default EditSimulationForm;
