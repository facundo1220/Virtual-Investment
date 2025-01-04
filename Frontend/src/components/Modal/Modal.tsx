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
      <div className="w-full max-w-md h-full lg:h-auto lg:rounded-2xl px-4 py-2 bg-white ">
        <div className="flex justify-between items-center w-auto h-14 gap-7 border-b">
          <p className="text-headline4 font-medium">{title}</p>
          <IoClose size={30} onClick={handleClose} />
        </div>
        <div className="h-auto py-5">{children}</div>
        <div className="flex justify-between">
          <Button
            className="w-1/2 rounded-full text-white bg-green-700 hover:bg-green-800"
            title={actionButtonTitle}
            onclick={handleSubmit}
          />

          <Button
            className="w-1/2 rounded-full text-white bg-red-700 hover:bg-red-800"
            title="Cancel"
            onclick={handleClose}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
