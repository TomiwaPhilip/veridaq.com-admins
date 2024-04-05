import { SearchBar, Card3 } from "@/components/shared/shared";
import { cardData3 } from "@/constants/cards";

export default function Store() {
    return (
        <main className="mt-[60px]">
            <div className="">
                <SearchBar />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center mt-[30px]">
            {cardData3.map((card, index) => (
            <Card3
                key={index} // Ensure each Card component has a unique key
                heading={card.heading}
                textColor={card.textColor}
                bgColor={card.bgColor}
                outlineColor={card.outlineColor}
            />
            ))}
        </div>
        </main>
    )
}