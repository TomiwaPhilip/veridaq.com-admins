"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { RiLoader4Line } from "react-icons/ri";

import ModalWithStepper from "@/components/shared/Modal";
import { SearchBar2, VeridaqDocument } from "@/components/shared/shared";
import {
  getWorkReference,
  getDocVerification,
  getMemberReference,
  getStudentshipStatus,
} from "@/lib/actions/request.action";

export default function Box() {
  interface Documents {
    DocDetails: string;
    DocId: string;
    DocDate: string;
  }

  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [openModalDocId, setOpenModalDocId] = useState<string | null>(null);
  const [workReferenceDoc, setWorkReferenceDoc] = useState<Documents[]>([]);
  const [memberReferenceDoc, setMemberReferenceDoc] = useState<Documents[]>([]);
  const [docVerificationDoc, setDocVerificationDoc] = useState<Documents[]>([]);
  const [studentStatusDoc, setStudentStatusDoc] = useState<Documents[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doc1 = await getWorkReference();
        if (doc1) setWorkReferenceDoc(doc1);

        const doc2 = await getMemberReference();
        if (doc2) setMemberReferenceDoc(doc2);

        const doc3 = await getDocVerification();
        if (doc3) setDocVerificationDoc(doc3);

        const doc4 = await getStudentshipStatus();
        if (doc4) setStudentStatusDoc(doc4);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (id: string, docId: string) => {
    setOpenModalId(id);
    setOpenModalDocId(docId);
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  return (
    <main className="mt-[30px]">
      <div className="mb-[40px]">
        <p className="font-semibold text-[28px] text-[#38313A]">
          Pending Issuance
        </p>
        <p className="text-sm text-[#38313A]">
          Pending Veridaq Issuance from Veridaq Request to your Organization
        </p>
        <div className="mt-10">
          <div className="flex-1">
            <div className="p-7 bg-[#C3B8D8] rounded-lg h-full">
              <div className="">
                <SearchBar2 />
              </div>
              <div className="mt-10 overflow-auto">
                {!isLoading ? (
                  <>
                    {workReferenceDoc.length > 0 ||
                    memberReferenceDoc.length > 0 ||
                    docVerificationDoc.length > 0 ||
                    studentStatusDoc.length > 0 ? (
                      <>
                        {workReferenceDoc.map((doc: Documents) => (
                          <VeridaqDocument
                            key={doc.DocId}
                            DocDetails={doc.DocDetails}
                            DocDate={doc.DocDate}
                            docId={doc.DocId}
                            id="1"
                            onClick={handleOpenModal}
                          />
                        ))}
                        {memberReferenceDoc.map((doc: Documents) => (
                          <VeridaqDocument
                            key={doc.DocId}
                            DocDetails={doc.DocDetails}
                            DocDate={doc.DocDate}
                            docId={doc.DocId}
                            id="3"
                            onClick={handleOpenModal}
                          />
                        ))}
                        {docVerificationDoc.map((doc: Documents) => (
                          <VeridaqDocument
                            key={doc.DocId}
                            DocDetails={doc.DocDetails}
                            DocDate={doc.DocDate}
                            docId={doc.DocId}
                            id="4"
                            onClick={handleOpenModal}
                          />
                        ))}
                        {studentStatusDoc.map((doc: Documents) => (
                          <VeridaqDocument
                            key={doc.DocId}
                            DocDetails={doc.DocDetails}
                            DocDate={doc.DocDate}
                            docId={doc.DocId}
                            id="2"
                            onClick={handleOpenModal}
                          />
                        ))}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Image
                          src="/assets/images/error.png"
                          alt="No Document Found"
                          width={200}
                          height={200}
                        />
                        <p className="text-center mt-2">
                          You have no Documents yet!
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <RiLoader4Line className="animate-spin text-2xl mb-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModalId && (
        <ModalWithStepper
          id={openModalId}
          onClose={handleCloseModal}
          docId={openModalDocId}
        />
      )}
    </main>
  );
}
