import type { Metadata } from "next";
import "../globals.css";

import { Nav, Header } from "@/components/shared/shared";
// import { Providers } from "@/components/shared/providers"

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Request, receive, and share your Veridaq",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        {/* <Providers>     */}
        <main className="">
          <Nav />
          <div className="p-8 absolute right-0 left-[230px]">
            <Header/>
            {children}
          </div>
        </main>
        {/* </Providers> */}
      </body>
    </html>
  );
}
