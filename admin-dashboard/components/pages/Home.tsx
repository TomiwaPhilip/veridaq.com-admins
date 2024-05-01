"use client";

import Image from 'next/image';
import { SearchBar, ListCard } from '../shared/shared';
import React, { useState, useEffect } from "react";
import { RiLoader4Line } from 'react-icons/ri';
import {
  getUserDoc,
} from "@/lib/actions/request.action";

export default function HomePage() {

  interface Documents {
    userName: string;
    userType: string;
    userId: string;
  }

  const [userDoc, setUserDoc] = useState<Documents[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const doc1 = await getUserDoc();
        if (doc1) setUserDoc(doc1);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="bg-[#E1D7E2] mt-[70px]">
      <div className="mr-auto">
        <p className="font-bold text-[28px] text-[#38313A]">
          Your application now has {userDoc.length} users
        </p>
      </div>
      <div className="">
        <SearchBar />
      </div>
      <div className="justify-center mt-[40px]">
        {!isLoading ? (
          <>
            {userDoc.length > 0 ? (
              userDoc.map((doc: Documents) => (
                <ListCard
                  key={doc.userId}
                  userName={doc.userName}
                  userType={doc.userType}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Image
                  src="/assets/images/error.png"
                  alt="Not Found"
                  width={200}
                  height={200}
                />
                <p className="text-center mt-2">No documents found!</p>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <RiLoader4Line className="animate-spin text-2xl mb-4" />
            <p>Loading...</p>
          </div>
        )}
      </div>
    </main>

  );
}
