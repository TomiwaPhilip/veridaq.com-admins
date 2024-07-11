"use client";
import { useState } from "react";
import type { Metadata } from "next";
import "../globals.css";

import { Nav, Header, BottomBar } from "@/components/shared/shared";

// export const metadata: Metadata = {
//   title: "My Dashboard",
//   description: "Request, receive, and share your Veridaq",
// };

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [feedback, setFeedback] = useState(false);
  return (
    <html lang="en">
      <head>
        <title>My Dashboard</title>
        <meta
          name="description"
          content="Request, receive, and share your Veridaq"
        />
      </head>
      <body>
        <main className="">
          <Nav />
          <div className="p-8 absolute right-0 lg:left-[230px]">
            <Header />
            {children}
            <div className="flex flex-col items-end justify-end gap-5 fixed bottom-10 right-10">
              {feedback ? (
                <div className="flex flex-col gap-1">
                  <textarea
                    rows={4}
                    cols={20}
                    placeholder="write your feedback message here"
                    className="p-1 rounded-xl"
                  />
                  <button className="w-full h-10 text-white bg-purple-500 rounded-full">
                    submit
                  </button>
                </div>
              ) : null}
              <div
                onClick={() => setFeedback((prev) => !prev)}
                className="w-14 h-14 text-4xl border border-purple-500 hover:border-white hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer rounded-full bg-purple-500 flex items-center justify-center"
              >
                💬
              </div>
            </div>
          </div>
          <BottomBar />
        </main>
      </body>
    </html>
  );
}
