import { CiCircleRemove } from "react-icons/ci";

function DeleteSimulationContent() {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-5">
      <CiCircleRemove className="text-red-700" size={100} />
      <p className="text-paragraph text-center mb-4">
        Are you sure you want to delete this item?
      </p>
    </div>
  );
}

export default DeleteSimulationContent;
