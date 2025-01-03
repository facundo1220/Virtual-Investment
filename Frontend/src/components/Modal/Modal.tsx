import { IoClose } from "react-icons/io5";
import Button from "../Button/Button";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  actionButtonTitle: string;
  children?: JSX.Element | JSX.Element[];
}

function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  actionButtonTitle,
  children,
}: ModalProps) {
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed flex inset-0 items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="md:rounded-2xl px-4 py-2 bg-white w-full max-w-md h-full md:h-auto">
        <div className="flex justify-between items-center gap-7 w-auto h-14 border-b">
          <p className="text-headline4 font-medium">{title}</p>
          <IoClose size={30} onClick={handleClose} />
        </div>
        <div className="h-auto py-5">{children}</div>
        <div className="flex justify-between">
          <Button
            className=" text-white bg-green-700 rounded-full hover:bg-green-800 w-1/2"
            title={actionButtonTitle}
            onclick={handleSubmit}
          />

          <Button
            className=" text-white bg-red-700 rounded-full  hover:bg-red-800 w-1/2"
            title="Cancel"
            onclick={handleClose}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
