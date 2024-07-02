"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { RiLoader4Line } from "react-icons/ri";

import { useSession } from "@/components/shared/shared";
import { SearchBar, Card3 } from "@/components/shared/shared";
import {
  getIssuedDocVerification,
  getIssuedMemberReference,
  getIssuedStudentshipStatus,
  getIssuedWorkReference,
} from "@/lib/actions/request.action";

export default function Store() {
  interface Documents {
    heading: string;
    DocId: string;
    textColor: string;
    bgColor: string;
    outlineColor: string;
    link: string;
  }

  const [workReferenceDoc, setWorkReferenceDoc] = useState<Documents[]>([]);
  // const [memberReferenceDoc, setMemberReferenceDoc] = useState<Documents[]>([]);
  // const [docVerificationDoc, setDocVerificationDoc] = useState<Documents[]>([]);
  // const [studentStatusDoc, setStudentStatusDoc] = useState<Documents[]>([]);
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doc1 = await getIssuedWorkReference();
        if (doc1) setWorkReferenceDoc(doc1);

        // const doc2 = await getIssuedMemberReference();
        // if (doc2) setMemberReferenceDoc(doc2);

        // const doc3 = await getIssuedDocVerification();
        // if (doc3) setDocVerificationDoc(doc3);

        // const doc4 = await getIssuedStudentshipStatus();
        // if (doc4) setStudentStatusDoc(doc4);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="mt-[60px] mb-[5rem]">
      <div className="">
        <SearchBar />
      </div>
      {!isLoading ? (
        <>
          {workReferenceDoc.length > 0 ? (
            <div className="mt-10 overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
              {/* Render cards for each type of document */}
              {workReferenceDoc.map((doc: Documents) => (
                <Card3
                  key={doc.DocId} // Ensure each Card component has a unique key
                  heading={doc.heading}
                  textColor={doc.textColor}
                  bgColor={doc.bgColor}
                  outlineColor={doc.outlineColor}
                  link={doc.link}
                />
              ))}
              {/* {memberReferenceDoc.map((doc: Documents) => (
                <Card3
                  key={doc.DocId} // Ensure each Card component has a unique key
                  heading={doc.heading}
                  textColor={doc.textColor}
                  bgColor={doc.bgColor}
                  outlineColor={doc.outlineColor}
                  link={doc.link}
                />
              ))}
              {docVerificationDoc.map((doc: Documents) => (
                <Card3
                  key={doc.DocId} // Ensure each Card component has a unique key
                  heading={doc.heading}
                  textColor={doc.textColor}
                  bgColor={doc.bgColor}
                  outlineColor={doc.outlineColor}
                  link={doc.link}
                />
              ))}
              {studentStatusDoc.map((doc: Documents) => (
                <Card3
                  key={doc.DocId} // Ensure each Card component has a unique key
                  heading={doc.heading}
                  textColor={doc.textColor}
                  bgColor={doc.bgColor}
                  outlineColor={doc.outlineColor}
                  link={doc.link}
                />
              ))} */}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full mt-[3rem]">
              <Image
                src="/assets/images/error.png"
                alt="No Document Found"
                width={200}
                height={200}
              />
              <p className="text-center mt-2">You have no Documents yet!</p>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-full mt-[3rem]">
          <RiLoader4Line className="animate-spin text-2xl mb-4" />
          <p className="font-bold">Loading...</p>
        </div>
      )}
    </main>
  );
}
