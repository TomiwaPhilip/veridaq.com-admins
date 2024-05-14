"use client";

import React, { useState } from "react";
import StepperForm from "./Stepper";

interface ModalWithStepperProps {
  id: string;
  docId?: string | null;
  onClose: () => void;
}

const ModalWithStepper: React.FC<ModalWithStepperProps> = ({
  id,
  onClose,
  docId,
}) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 backdrop-blur-sm overflow-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg normal-border w-full max-h-[55vh] h-[55vh] overflow-auto mx-5 md:mx-0 md:w-[70%] max-h-[70%] h-[70%]"
        onClick={(e) => e.stopPropagation()}
      >
        <StepperForm id={id} docId={docId} />
      </div>
    </div>
  );
};

export default ModalWithStepper;
