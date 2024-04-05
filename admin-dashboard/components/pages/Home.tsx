import Image from 'next/image';
import { Wallet, Card } from '../shared/shared';
import { cardData } from '@/constants/cards';

export default function HomePage() {
  return (
    <main className="bg-[#E1D7E2] mt-[70px]">
      <div className="flex items-center justify-center gap-6">
        <div className="mr-auto w-[40%]">
          <p className="font-bold text-[28px] text-[#38313A]">
            Let&apos;s help you get started today!
          </p>
        </div>
        <Wallet />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center mt-[40px]">
        {cardData.map((card, index) => (
          <Card
            key={index} // Ensure each Card component has a unique key
            heading={card.heading}
            paragraph={card.paragraph}
            bgColor={card.bgColor}
            outlineColor={card.outlineColor}
          />
        ))}
      </div>
    </main>
  );
}
