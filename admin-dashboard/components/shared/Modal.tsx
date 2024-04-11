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
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg normal-border"
        onClick={(e) => e.stopPropagation()}
      >
        <StepperForm id={id} docId={docId} />
      </div>
    </div>
  );
};

export default ModalWithStepper;
