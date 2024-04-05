import Image from 'next/image';
import { Wallet, Card, SearchBar, ListCard } from '../shared/shared';
import { cardData } from '@/constants/cards';

export default function HomePage() {
  return (
    <main className="bg-[#E1D7E2] mt-[70px]">
        <div className="mr-auto">
          <p className="font-bold text-[28px] text-[#38313A]">
            Your application now has 1100,000 users
          </p>
        </div>
        <div className="">
          <SearchBar />
        </div>
      <div className="justify-center mt-[40px]">
        <ListCard userName='Tomiwa Philip' userType='Individual' />
      </div>
    </main>
  );
}
