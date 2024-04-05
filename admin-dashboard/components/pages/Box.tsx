import Image from "next/image";

import MessageBox from "@/components/shared/messagebox";
import ChatBox from "@/components/shared/chatBox";
import { SearchBar2, VeridaqDocument } from "@/components/shared/shared";


export default function Box() {
    return (
        <main className="mt-[30px]">
            <div className="mb-[40px]"> 
                <p className="font-semibold text-[28px] text-[#38313A]">Pending Issuance</p>
                <p className="text-sm text-[#38313A]">Pending Veridaq Issuance from Veridaq Request to your Organization</p>
                <div className="mt-10">
                    <div className="p-7 bg-[#C3B8D8] rounded-lg">
                        <div className="">
                            <SearchBar2 />
                        </div>
                        <div className="mt-10">
                            <VeridaqDocument 
                                DocDetails={"Document Verification Veridaq from Tomiwa Philip"}
                                DocDate={"12-04-2024"}
                            />
                        </div>
                        <div className="mt-10">
                            <hr className="w-full text-center" style={{ borderColor: '#897A8B' }} />
                            <div className="flex items-center justify-center gap-3 p-3">
                                <button type="button"> 
                                    <Image
                                        src={"/assets/icons/icon-chevron-left.svg"}
                                        alt="left"
                                        width={30}
                                        height={30}
                                    />
                                </button>
                                <p className="text-sm text-[#38313A]">Page 1</p>
                                <button type="button"> 
                                    <Image
                                        src={"/assets/icons/icon-chevron-right.svg"}
                                        alt="left"
                                        width={30}
                                        height={30}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <p className="font-semibold text-[28px] text-[#38313A]">Veridaq Mails</p>
                <div className="rounded-lg bg-[#C3B8D8] flex h-screen gap-3 p-10 mt-8">
                    <MessageBox />
                    <ChatBox />
                </div>
            </div>
        </main>
    )
}