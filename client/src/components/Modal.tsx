import React from "react";

interface GlobalModalProps {
  message: string;
  onClose: () => void;
}

const GlobalModal: React.FC<GlobalModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <p>{message}</p>
        <button
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default GlobalModal;
