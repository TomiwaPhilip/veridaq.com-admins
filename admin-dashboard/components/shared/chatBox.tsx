import { MessageLabel, MessageCard, MessageBox } from "./shared";

export default function ChatBox() {
  return (
    <div className="relative bg-[#CBC0CD] flex-grow h-full w-1/2 normal-border rounded-lg" style={{ overflow: "scroll", overflowX: "hidden" }}>
      <div className="flex items-center justify-center">
        <MessageLabel
            imgSrc="/assets/images/user.png"
            name="Tomiwa Philip"
        />
      </div>
      <div className="mt-[100px] mx-6">
        <MessageCard
          message="Hey, How are you?!"
          timeStamp="2:10PM"
          bgColor={"#443B46"}
        />
      </div>
      <MessageBox />
    </div>
  );
}