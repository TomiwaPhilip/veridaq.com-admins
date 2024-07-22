import { MessageView } from "./shared"

export default function MessageBox(){
    return (
        <div className="p-5 bg-[#CBC0CD] flex-grow h-full w-1/2 normal-border rounded-lg" style={{overflow: "scroll", overflowX: "hidden"}}>
            <MessageView 
                name="Tomiwa Philip"
                timestamp="12:10 PM"
                message="This is urgent, tomiwa"
                imgSrc="/assets/images/user.png"
            />
        </div>
    )
}