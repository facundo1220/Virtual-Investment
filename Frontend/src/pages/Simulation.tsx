import React, { useEffect, useState, Suspense } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  deleteSimulation,
  getSimulations,
  SimulationData,
  generateSimulation,
  updateSimulation,
} from "../services/Simulation";
import { useAppContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import DeleteSimulationContent from "../components/Simulations/DeleteSimulationContent";
import EditSimulationForm from "../components/Simulations/EditSimulationForm";
import { useForm, FormProvider } from "react-hook-form";
import { simulationValidationSchema } from "../schemas/simulationSchema";

const TableSimulations = React.lazy(
  () => import("../components/Simulations/TableSimulations")
);

interface FormData {
  value: number;
  fromDate: string;
  toDate: string;
  paymentType: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

function Simulation() {
  const navigate = useNavigate();

  const [selectedSimulation, setSelectedSimulation] =
    useState<SimulationData | null>(null);

  const methods = useForm<FormData>({
    defaultValues: {
      value: selectedSimulation?.amount || 0,
      fromDate: selectedSimulation?.fromDate
        ? formatDate(selectedSimulation?.fromDate)
        : "",
      toDate: selectedSimulation?.toDate
        ? formatDate(selectedSimulation?.toDate)
        : "",
      paymentType: selectedSimulation?.paymentTerm || "",
    },
    resolver: yupResolver(simulationValidationSchema),
  });

  const { reset } = methods;

  const { Simulations, setSimulations } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalAction, setModalAction] = useState<"edit" | "delete" | null>(
    null
  );

  useEffect(() => {
    if (selectedSimulation && modalAction === "edit") {
      reset({
        value: selectedSimulation.amount || 0,
        fromDate: selectedSimulation.fromDate
          ? formatDate(selectedSimulation.fromDate)
          : "",
        toDate: selectedSimulation.toDate
          ? formatDate(selectedSimulation.toDate)
          : "",
        paymentType: selectedSimulation.paymentTerm || "monthly",
      });
    }
  }, [selectedSimulation, modalAction, reset]);

  const handleDelete = () => {
    deleteSimulation(selectedSimulation?.id);
    closeModal();
    window.location.reload();
  };

  const handleEdit = async ({
    value,
    paymentType,
    fromDate,
    toDate,
  }: FormData) => {
    try {
      const simulation = await generateSimulation({
        amount: Number(value),
        paymentTerm: paymentType,
        fromDate,
        toDate,
      });

      if (simulation && selectedSimulation?.id) {
        updateSimulation(selectedSimulation?.id, simulation);
      }

      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error generating simulation:", error);
    }
  };

  const openModal = (simulation: SimulationData, action: "edit" | "delete") => {
    setIsModalOpen(true);
    setSelectedSimulation(simulation);
    setModalAction(action);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
    setSelectedSimulation(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allSimulations = await getSimulations(
          localStorage.getItem("user_id")
        );
        setSimulations(allSimulations);
      } catch (error) {
        if (error instanceof Error) {
          navigate("/Simulations");
        } else {
          alert("An unknown error occurred");
        }
      }
    };
    fetchData();
  }, [setSimulations, navigate]);

  const isDeleteAction = modalAction === "delete";
  const modalTitle = isDeleteAction ? "Remove Simulation" : "Edit simulation";
  const actionButtonTitle = isDeleteAction ? "Remove" : "Save changes";
  const onSubmit = isDeleteAction
    ? handleDelete
    : methods.handleSubmit(handleEdit);
  const ModalContent = isDeleteAction
    ? DeleteSimulationContent
    : EditSimulationForm;

  return (
    <div className="mt-14 px-5 h-full">
      {Array.isArray(Simulations?.data) && Simulations?.data.length > 0 ? (
        <Suspense fallback={<p>Loading simulations...</p>}>
          <TableSimulations data={Simulations.data} openModal={openModal} />
        </Suspense>
      ) : (
        <p>No simulations available</p>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        actionButtonTitle={actionButtonTitle}
        onSubmit={onSubmit}
      >
        <FormProvider {...methods}>
          <ModalContent />
        </FormProvider>
      </Modal>
    </div>
  );
}

export default Simulation;
