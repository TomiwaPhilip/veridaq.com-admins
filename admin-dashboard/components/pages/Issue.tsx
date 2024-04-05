"use client";

import React, { useState } from 'react';

import ModalWithStepper from '@/components/shared/Modal';
import { cardData2 } from "@/constants/cards";
import { Card2 } from '../shared/shared';

const IssueVeridaq: React.FC = () => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const handleOpenModal = (id: string) => {
    setOpenModalId(id);
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  return (
    <main className="bg-[#E1D7E2] mt-[70px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center mt-[40px]">
        {/* Map through the card data and render each card */}
        {cardData2.map((card, index) => (
          <Card2
            key={index}
            id={card.id} // Assuming your card data includes an id
            heading={card.heading}
            textColor={card.textColor}
            bgColor={card.bgColor}
            outlineColor={card.outlineColor}
            onClick={handleOpenModal} // Pass the click handler
          />
        ))}
      </div>
      {openModalId && (
        <ModalWithStepper id={openModalId} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default IssueVeridaq;
