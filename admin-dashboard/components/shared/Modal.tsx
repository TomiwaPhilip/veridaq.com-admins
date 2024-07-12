"use client"

import React, { useState } from "react"
import StepperForm from "./Stepper"
import { RiCloseCircleFill } from "react-icons/ri"
import { ZoomInMotion } from "./Animations"

interface ModalWithStepperProps {
  id: string
  docId?: string | null
  onClose: () => void
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
      <ZoomInMotion
        initialScale={0.5}
        duration={0.2}
        className="bg-white shadow-lg w-[100vw] overflow-auto md:mx-0 md:w-[100vw] h-[100vh] pt-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:max-w-[60%] mx-auto mb-[7rem]">
          <StepperForm id={id} docId={docId} />
        </div>
        <div>
          <RiCloseCircleFill
            className="text-violet-400 text-3xl cursor-pointer absolute top-7 right-7 z-[20]"
            onClick={onClose}
          />
        </div>
      </ZoomInMotion>
    </div>
  )
}

export default ModalWithStepper
