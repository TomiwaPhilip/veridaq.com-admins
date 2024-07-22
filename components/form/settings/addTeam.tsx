// "use client";

// import React, { useState, useEffect } from "react";
// import { RiLoader4Line } from "react-icons/ri";

// import { BlackButton } from "@/components/shared/buttons";
// import { Card4 } from "@/components/shared/shared";
// // import { getTeamMembers } from "@/lib/actions/request.action";
// import ModalForm from "./modalForm";

// export default function AddTeam() {
//   interface Documents {
//     DocId: string;
//     heading: string;
//     role: any;
//     roles: any;
//   }

//   const [openModal, setOpenModal] = useState(false);

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const [teamMembersDoc, setTeamMembersDoc] = useState<Documents[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     console.log("Fetchig teams");
//     const fetchData = async () => {
//       try {
//         const doc1 = await getTeamMembers();
//         console.log(doc1);
//         if (doc1) setTeamMembersDoc(doc1);
//         console.log(teamMembersDoc);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching documents:", error);
//       }
//     };

//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <>
//       <div className="text-[#38313A] mb-[5rem] lg:mb-[0rem]">
//         <div className="mt-[50px]">
//           <p className="text-2xl font-bold mb-5">
//             Admin & Organization Members Settings
//           </p>
//           <>
//             {!isLoading ? (
//               <div className="flex flex-col items-center justify-center gap-10">
//                 {teamMembersDoc.map((doc: Documents) => (
//                   <Card4
//                     key={doc.DocId}
//                     heading={doc.heading}
//                     textColor={
//                       doc.roles === "admin"
//                         ? "#000000"
//                         : doc.roles === "member"
//                           ? "#694C9F"
//                           : ""
//                     }
//                     bgColor={
//                       doc.roles === "admin"
//                         ? "#F4DBE4"
//                         : doc.roles === "member"
//                           ? "#F4DBE4"
//                           : "#554957"
//                     }
//                     outlineColor={
//                       doc.roles === "admin"
//                         ? "#694C9F"
//                         : doc.roles === "member"
//                           ? "#694C9F"
//                           : "#554957"
//                     }
//                     rights={
//                       doc.roles === "admin"
//                         ? "Has rights to everything on Veridaq"
//                         : doc.roles === "member"
//                           ? "Has rights to Work Reference Veridaq"
//                           : "#554957"
//                     }
//                     role={doc.role}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-full">
//                 <RiLoader4Line className="animate-spin text-2xl mb-4" />
//               </div>
//             )}
//           </>

//           <div className="">
//             <BlackButton
//               type="submit"
//               name="Add Team Members"
//               onClick={handleOpenModal}
//             />
//           </div>
//         </div>
//       </div>
//       {openModal && <ModalForm onClose={handleCloseModal} />}
//     </>
//   );
// }
