import type { Metadata } from "next";
import "../globals.css";

import { Nav, Header, BottomBar } from "@/components/shared/shared";

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
        <main className="">
          <Nav />
          <div className="p-8 absolute right-0 lg:left-[230px]">
            <Header />
            {children}
          </div>
          <BottomBar />
        </main>
      </body>
    </html>
  );
}
