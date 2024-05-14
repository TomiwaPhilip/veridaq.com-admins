"use server";

import getSession from "@/lib/actions/server-hooks/getsession.action";
import connectToDB from "../model/database";
import WorkReferenceAdmin from "../utils/workreferenceadmin";
import StudentshipStatusAdmin from "../utils/studentshipstatusadmin";
import DocumentVerificationAdmin from "../utils/documentVerificationAdmin";
import MembershipReferenceAdmin from "../utils/membershipReferenceAdmin";
import User from "../utils/user";
import Organization from "../utils/organizationSchema";
import {
  generateVeridaqID,
  concatenateDates,
  getCurrentDateTime,
} from "../utils";
import { getDocAndUpload } from "./server-hooks/requestWithUpload.action";
import { Admin, IAdmin, IAdminModel } from "../utils/adminSchema";

interface Params {
  firstName: string;
  lastName: string;
  middleName?: string; // Optional middleName field
  employeeType: string;
  subType: string;
  staffId: string;
  designation: string;
  workStartDate: Date;
  workEndDate: Date | undefined; // Nullable workEndDate field
  department: string;
  notableAchievement?: string; // Optional notableAchievement field
  jobFunction: string; // Renamed from 'function' to 'jobFunction'
  personalitySummary?: string; // Optional personalitySummary field
  id?: string;
  orgName: string;
  orgAddress: string;
  orgPostalCode: string;
  orgCountry: string;
  orgEmail: string;
  orgPhone: string;
  contactName: string;
  contactAddress: string;
  contactPostalCode: string;
  contactCountry: string;
  contactEmail: string;
  contactPhone: string;
}

// TODO createDocument functions not updating

export async function createOrUpdateWorkReferenceRequest({
  id,
  firstName,
  lastName,
  middleName,
  employeeType,
  subType,
  staffId,
  designation,
  workStartDate,
  workEndDate,
  department,
  notableAchievement,
  jobFunction,
  personalitySummary,
  orgName,
  orgAddress,
  orgPostalCode,
  orgCountry,
  orgEmail,
  orgPhone,
  contactName,
  contactAddress,
  contactPostalCode,
  contactCountry,
  contactEmail,
  contactPhone,
}: Params) {
  try {
    // Connect to the database
    connectToDB();

    console.log(id);

    const session = await getSession();

    const period = concatenateDates(workStartDate, workEndDate);
    const currentDateTime = getCurrentDateTime();
    const badgeID = generateVeridaqID();

    const data = {
      nameOfEmployee: firstName + " " + lastName,
      employeeID: staffId,
      employeeStatus: subType,
      nameOfInstitution: orgName,
      subType: employeeType,
      designation: designation,
      department: department,
      period: period,
      jobFunctions: jobFunction,
      notableAchievement: notableAchievement,
      personalitySummary: personalitySummary,
      nameOfAdmin: contactName,
      adminDesignation: "Admin",
      currentDateTime: currentDateTime,
      badgeID: badgeID,
    };
    const url = "https://generator-abfcaoddhq-bq.a.run.app/work-reference";
    const docName = "workReference.pdf";

    const result = await getDocAndUpload(data, url, docName);

    if (result) {
      // If id is provided, find and update the document
      if (id) {
        const workref = await WorkReferenceAdmin.findByIdAndUpdate(
          id,
          {
            firstName,
            lastName,
            middleName,
            employeeType,
            subType,
            staffId,
            designation,
            workStartDate,
            workEndDate,
            department,
            notableAchievement,
            jobFunction,
            personalitySummary,
            orgName,
            orgAddress,
            orgPostalCode,
            orgCountry,
            orgEmail,
            orgPhone,
            contactName,
            contactAddress,
            contactPostalCode,
            contactCountry,
            contactEmail,
            contactPhone,
            issued: true,
            dateIssued: new Date(),
            badgeUrl: result,
            badgeID: badgeID,
            issuingAdminDetails: session.userId,
          },
          { new: true },
        );
        console.log(workref);
        return true; // Return true if update is successful
      } else {
        // If id is not provided, create a new document
        const session = await getSession();

        if (!session) {
          throw new Error("Unauthorized");
        }

        // Create a new WorkReference document
        const workReference = new WorkReferenceAdmin({
          firstName,
          lastName,
          middleName,
          employeeType,
          subType,
          staffId,
          designation,
          workStartDate,
          workEndDate,
          department,
          notableAchievement,
          jobFunction,
          personalitySummary,
          orgName,
          orgAddress,
          orgPostalCode,
          orgCountry,
          orgEmail,
          orgPhone,
          contactName,
          contactAddress,
          contactPostalCode,
          contactCountry,
          contactEmail,
          contactPhone,
          issued: true,
          dateIssued: new Date(),
          badgeUrl: result,
          badgeID: badgeID,
          issuingAdminDetails: session.userId,
        });

        // Save the WorkReference document to the database
        await workReference.save();
        return true; // Return true if creation is successful
      }
    } else return false;
  } catch (error: any) {
    throw new Error(
      `Failed to save/update WorkReference request: ${error.message}`,
    );
  }
}

interface StudentshipParams {
  firstName: string;
  lastName: string;
  middleName?: string; // Optional middleName field
  currentLevel: string;
  courseOfStudy: string;
  studentId: string;
  categoryOfStudy: string;
  faculty: string;
  entryYear: Date;
  exitYear?: Date; // Optional exitYear field
  image: string;
  id?: string;
  info?: string;
  orgName: string;
  orgAddress: string;
  orgPostalCode: string;
  orgCountry: string;
  orgEmail: string;
  orgPhone: string;
  contactName: string;
  contactAddress: string;
  contactPostalCode: string;
  contactCountry: string;
  contactEmail: string;
  contactPhone: string;
  _id: string;
}

// Define the createStudentshipStatus function
export async function createOrUpdateStudentshipStatus(
  params: StudentshipParams,
) {
  try {
    // Connect to the database
    connectToDB();

    console.log(params._id);

    const session = await getSession();

    const period = concatenateDates(params.entryYear, params.exitYear);
    const currentDateTime = getCurrentDateTime();
    const badgeID = generateVeridaqID();

    console.log(params.id);

    const data = {
      nameOfStudent: params.firstName + " " + params.lastName,
      studentID: params.studentId,
      nameOfInstitution: params.orgName,
      passportUrl: params.image,
      categoryOfStudy: params.categoryOfStudy,
      currentLevel: params.currentLevel,
      courseOfStudy: params.courseOfStudy,
      faculty: params.faculty,
      yearOfEntryAndExit: period,
      nameOfAdmin: params.contactName,
      adminDesignation: "Admin",
      currentDateTime: currentDateTime,
      badgeID: badgeID,
    };
    const url = "https://generator-abfcaoddhq-bq.a.run.app/student-status";
    const docName = "studentStatus.pdf";

    const result = await getDocAndUpload(data, url, docName);

    if (result) {
      // If id is provided, find and update the document
      if (params._id) {
        await StudentshipStatusAdmin.findByIdAndUpdate(
          params._id,
          {
            firstName: params.firstName,
            lastName: params.lastName,
            middleName: params.middleName,
            currentLevel: params.currentLevel,
            courseOfStudy: params.courseOfStudy,
            studentId: params.studentId,
            faculty: params.faculty,
            entryYear: params.entryYear,
            exitYear: params.exitYear,
            image: params.image,
            info: params.info,
            orgName: params.orgName,
            orgAddress: params.orgAddress,
            orgPostalCode: params.orgPostalCode,
            orgCountry: params.orgCountry,
            orgEmail: params.orgEmail,
            orgPhone: params.orgPhone,
            contactName: params.contactName,
            contactAddress: params.contactAddress,
            contactPostalCode: params.contactPostalCode,
            contactCountry: params.contactCountry,
            contactEmail: params.contactEmail,
            contactPhone: params.contactPhone,
            issued: true,
            dateIssued: new Date(),
            badgeUrl: result,
            badgeID: badgeID,
            issuingAdminDetails: session.userId,
          },
          { new: true },
        );
        return true; // Return true if update is successful
      } else {
        // If id is not provided, create a new document
        const session = await getSession();

        if (!session) {
          throw new Error("Unauthorized");
        }

        // Create a new WorkReference document
        const studentshipStatus = new StudentshipStatusAdmin({
          firstName: params.firstName,
          lastName: params.lastName,
          middleName: params.middleName,
          currentLevel: params.currentLevel,
          courseOfStudy: params.courseOfStudy,
          studentId: params.studentId,
          faculty: params.faculty,
          entryYear: params.entryYear,
          exitYear: params.exitYear,
          image: params.image,
          info: params.info,
          orgName: params.orgName,
          orgAddress: params.orgAddress,
          orgPostalCode: params.orgPostalCode,
          orgCountry: params.orgCountry,
          orgEmail: params.orgEmail,
          orgPhone: params.orgPhone,
          contactName: params.contactName,
          contactAddress: params.contactAddress,
          contactPostalCode: params.contactPostalCode,
          contactCountry: params.contactCountry,
          contactEmail: params.contactEmail,
          contactPhone: params.contactPhone,
          issued: true,
          dateIssued: new Date(),
          badgeUrl: result,
          badgeID: badgeID,
          issuingAdminDetails: session.userId,
        });

        // Save the WorkReference document to the database
        await studentshipStatus.save();
        return true; // Return true if creation is successful
      }
    } else return false;
  } catch (error: any) {
    throw new Error(
      `Failed to save/update StudentshipStatus request: ${error.message}`,
    );
  }
}

interface MembershipParams {
  firstName: string;
  lastName: string;
  middleName?: string;
  id: string;
  memberSince: Date;
  alumniCategory?: string;
  image?: string;
  _id?: string;
  orgName: string;
  orgAddress: string;
  orgPostalCode: string;
  orgCountry: string;
  orgEmail: string;
  orgPhone: string;
  contactName: string;
  contactAddress: string;
  contactPostalCode: string;
  contactCountry: string;
  contactEmail: string;
  contactPhone: string;
}

// Define the Membership Reference function
export async function createOrUpdateMembershipReference(
  params: MembershipParams,
) {
  try {
    // Connect to the database
    connectToDB();

    console.log(params._id);

    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    const period = concatenateDates(params.memberSince);
    const currentDateTime = getCurrentDateTime();
    const badgeID = generateVeridaqID();

    console.log(params.id);

    let result;

    if (!params.alumniCategory) {
      const data = {
        memberName: params.firstName + " " + params.lastName,
        memberID: params.id,
        nameOfInstitution: params.orgName,
        passportUrl: params.image,
        memberSince: period,
        nameOfOrganization: params.orgName,
        nameOfAdmin: params.contactName,
        adminDesignation: "Admin",
        currentDateTime: currentDateTime,
        badgeID: badgeID,
      };
      const url = "https://generator-abfcaoddhq-bq.a.run.app/member-reference";
      const docName = "memberReference.pdf";

      result = await getDocAndUpload(data, url, docName);
    } else {
      const data = {
        alumniName: params.firstName + " " + params.lastName,
        alumniID: params.id,
        nameOfInstitution: params.orgName,
        alumniSince: period,
        alumniCategory: params.alumniCategory,
        nameOfOrganization: params.orgName,
        nameOfAdmin: params.contactName,
        adminDesignation: "Admin",
        currentDateTime: currentDateTime,
        badgeID: badgeID,
      };
      const url = "https://generator-abfcaoddhq-bq.a.run.app/alumni-reference";
      const docName = "alumniReference.pdf";

      result = await getDocAndUpload(data, url, docName);
    }

    if (result) {
      // If id is provided, find and update the document
      if (params._id) {
        await MembershipReferenceAdmin.findByIdAndUpdate(
          params._id,
          {
            firstName: params.firstName,
            lastName: params.lastName,
            middleName: params.middleName,
            id: params.id,
            image: params.image,
            orgName: params.orgName,
            orgAddress: params.orgAddress,
            orgPostalCode: params.orgPostalCode,
            orgCountry: params.orgCountry,
            orgEmail: params.orgEmail,
            orgPhone: params.orgPhone,
            contactName: params.contactName,
            contactAddress: params.contactAddress,
            contactPostalCode: params.contactPostalCode,
            contactCountry: params.contactCountry,
            contactEmail: params.contactEmail,
            contactPhone: params.contactPhone,
            issued: true,
            dateIssued: new Date(),
            badgeUrl: result,
            badgeID: badgeID,
            issuingAdminDetails: session.userId,
          },
          { new: true },
        );
        return true; // Return true if update is successful
      } else {
        // If id is not provided, create a new document
        const session = await getSession();

        if (!session) {
          throw new Error("Unauthorized");
        }

        // Create a new WorkReference document
        const membershipReference = new MembershipReferenceAdmin({
          firstName: params.firstName,
          lastName: params.lastName,
          middleName: params.middleName,
          id: params.id,
          image: params.image,
          orgName: params.orgName,
          orgAddress: params.orgAddress,
          orgPostalCode: params.orgPostalCode,
          orgCountry: params.orgCountry,
          orgEmail: params.orgEmail,
          orgPhone: params.orgPhone,
          contactName: params.contactName,
          contactAddress: params.contactAddress,
          contactPostalCode: params.contactPostalCode,
          contactCountry: params.contactCountry,
          contactEmail: params.contactEmail,
          contactPhone: params.contactPhone,
          issued: true,
          dateIssued: new Date(),
          badgeUrl: result,
          badgeID: badgeID,
          issuingAdminDetails: session.userId,
        });

        // Save the WorkReference document to the database
        await membershipReference.save();
        return true; // Return true if creation is successful
      }
    } else return false;
  } catch (error: any) {
    throw new Error(
      `Failed to save/update membershipReference request: ${error.message}`,
    );
  }
}

interface DocumentParams {
  firstName: string;
  lastName: string;
  middleName?: string;
  id: string;
  documentType: string;
  documentName: string;
  info: string;
  image?: string;
  _id?: string;
  orgName: string;
  orgAddress: string;
  orgPostalCode: string;
  orgCountry: string;
  orgEmail: string;
  orgPhone: string;
  contactName: string;
  contactAddress: string;
  contactPostalCode: string;
  contactCountry: string;
  contactEmail: string;
  contactPhone: string;
}

// Define the createDocumentVerificationRequest function
export async function createOrUpdateDocumentVerificationRequest(
  params: DocumentParams,
) {
  try {
    // Connect to the database
    connectToDB();

    console.log(params._id);

    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    const currentDateTime = getCurrentDateTime();
    const badgeID = generateVeridaqID();

    console.log(params.id);

    const data = {
      nameOfOrganization: params.orgName,
      nameOfIndividual: params.firstName + " " + params.lastName,
      documentType: params.documentType,
      documentName: params.documentName,
      documentID: params.id,
      moreInfo: params.info,
      nameOfAdmin: params.contactName,
      adminDesignation: "Admin",
      currentDateTime: currentDateTime,
      badgeID: badgeID,
    };

    const url = "https://generator-abfcaoddhq-bq.a.run.app/doc-verification";
    const docName = "docVerification.pdf";

    const result = await getDocAndUpload(data, url, docName);

    if (result) {
      // If id is provided, find and update the document
      if (params._id) {
        await DocumentVerificationAdmin.findByIdAndUpdate(
          params._id,
          {
            firstName: params.firstName,
            lastName: params.lastName,
            middleName: params.middleName,
            documentType: params.documentType, // Assuming id in MembershipParams corresponds to documentType
            documentName: params.documentName, // Assuming info in MembershipParams corresponds to documentName
            id: params.id,
            info: params.info,
            image: params.image, // Default to empty string if image is not provided
            orgName: params.orgName,
            orgAddress: params.orgAddress,
            orgPostalCode: params.orgPostalCode,
            orgCountry: params.orgCountry,
            orgEmail: params.orgEmail,
            orgPhone: params.orgPhone,
            contactName: params.contactName,
            contactAddress: params.contactAddress,
            contactPostalCode: params.contactPostalCode,
            contactCountry: params.contactCountry,
            contactEmail: params.contactEmail,
            contactPhone: params.contactPhone,
            issued: true,
            dateIssued: new Date(),
            badgeUrl: result,
            badgeID: badgeID,
            issuingAdminDetails: session.userId,
          },
          { new: true },
        );
        return true; // Return true if update is successful
      } else {
        // If id is not provided, create a new document
        const session = await getSession();

        if (!session) {
          throw new Error("Unauthorized");
        }

        // Create a new WorkReference document
        const documentVerification = new DocumentVerificationAdmin({
          firstName: params.firstName,
          lastName: params.lastName,
          middleName: params.middleName,
          documentType: params.id, // Assuming id in MembershipParams corresponds to documentType
          documentName: params.info, // Assuming info in MembershipParams corresponds to documentName
          id: params.id,
          info: params.info,
          image: params.image, // Default to empty string if image is not provided
          orgName: params.orgName,
          orgAddress: params.orgAddress,
          orgPostalCode: params.orgPostalCode,
          orgCountry: params.orgCountry,
          orgEmail: params.orgEmail,
          orgPhone: params.orgPhone,
          contactName: params.contactName,
          contactAddress: params.contactAddress,
          contactPostalCode: params.contactPostalCode,
          contactCountry: params.contactCountry,
          contactEmail: params.contactEmail,
          contactPhone: params.contactPhone,
          issued: true,
          dateIssued: new Date(),
          badgeUrl: result,
          badgeID: badgeID,
          issuingAdminDetails: session.userId,
        });

        // Save the WorkReference document to the database
        await documentVerification.save();
        return true; // Return true if creation is successful
      }
    } else return false;
  } catch (error: any) {
    throw new Error(
      `Failed to save/update DocumentVerification request: ${error.message}`,
    );
  }
}

// TODO format date not working

// Helper function to format the date as "DD-MM-YYYY"
function formatDate(date: Date): string {
  console.log(date);
  if (!date) return ""; // Check if the date is undefined or null

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
}

export async function getWorkReference() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Query the WorkReference collection based on orgId
    const workReferences = await WorkReferenceAdmin.find({
      issued: false,
    }).select("firstName lastName dateRequested issued");

    console.log(workReferences);

    // console.log(workReferences);

    // Format the data before returning to the frontend
    const formattedData = workReferences.map((doc) => ({
      DocDetails: `Work Reference Veridaq Request from ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      DocDate: formatDate(doc.dateRequested), // Format the date
    }));

    if (formattedData) return formattedData;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch WorkReference documents");
  }
}

export async function getWorkReferenceById(docId: string) {
  try {
    // Connect to the database
    connectToDB();

    // Query the WorkReference collection based on the provided docId
    const workReference = await WorkReferenceAdmin.findById(docId);

    if (!workReference) {
      throw new Error("Document not found");
    }

    const stringifiedWorkReference = {
      ...workReference.toObject(),
      _id: workReference._id.toString(), // Convert _id to string
      user: workReference.user.toString(),
      // Convert other ObjectId fields to strings if necessary
    };

    // console.log(stringifiedWorkReference);

    return stringifiedWorkReference;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to fetch WorkReference document with ID: ${docId}`);
  }
}

export async function getDocVerification() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Query the WorkReference collection based on orgId
    const docVerification = await DocumentVerificationAdmin.find({
      issued: false,
    }).select("firstName lastName dateRequested");

    // Format the data before returning to the frontend
    const formattedData = docVerification.map((doc) => ({
      DocDetails: `Document Verification Veridaq Request from ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      DocDate: formatDate(doc.dateRequested), // Format the date
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch WorkReference documents");
  }
}

export async function getDocVerificationById(docId: string) {
  try {
    // Connect to the database
    connectToDB();

    // Query the WorkReference collection based on the provided docId
    const docVerification = await DocumentVerificationAdmin.findById(docId);

    if (!docVerification) {
      throw new Error("Document not found");
    }

    const stringifiedDocVerification = {
      ...docVerification.toObject(),
      _id: docVerification._id.toString(), // Convert _id to string
      user: docVerification.user.toString(),
      // Convert other ObjectId fields to strings if necessary
    };

    // console.log(stringifiedDocVerification);

    return stringifiedDocVerification;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to fetch document with ID: ${docId}`);
  }
}

export async function getMemberReference() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Query the WorkReference collection based on orgId
    const memberReference = await MembershipReferenceAdmin.find({
      issued: false,
    }).select("firstName lastName dateRequested");

    // Format the data before returning to the frontend
    const formattedData = memberReference.map((doc) => ({
      DocDetails: `Membership Reference Veridaq Request from ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      DocDate: formatDate(doc.dateRequested), // Format the date
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch WorkReference documents");
  }
}

export async function getMemberReferenceById(docId: string) {
  try {
    // Connect to the database
    connectToDB();

    // Query the WorkReference collection based on the provided docId
    const memberReference = await MembershipReferenceAdmin.findById(docId);

    if (!memberReference) {
      throw new Error("Document not found");
    }

    // Convert the MongoDB _id field and other IDs to string
    const stringifiedMemberReference = {
      ...memberReference.toObject(),
      _id: memberReference._id.toString(), // Convert _id to string
      user: memberReference.user.toString(),
    };

    // console.log(stringifiedWorkReference);

    return stringifiedMemberReference;
  } catch (error: any) {
    console.error(error);
    throw new Error(
      `Failed to fetch MemberReference document with ID: ${docId}`,
    );
  }
}

export async function getStudentshipStatus() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Query the WorkReference collection based on orgId
    const studentshipStatus = await StudentshipStatusAdmin.find({
      issued: false,
    }).select("firstName lastName dateRequested");

    // Format the data before returning to the frontend
    const formattedData = studentshipStatus.map((doc) => ({
      DocDetails: `Studentship Status Veridaq Request from ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      DocDate: formatDate(doc.dateRequested), // Format the date
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch studentshipStatus documents");
  }
}

export async function getStudentshipStatusById(docId: string) {
  try {
    // Connect to the database
    connectToDB();

    // Query the WorkReference collection based on the provided docId
    const studentshipStatus = await StudentshipStatusAdmin.findById(docId);

    if (!studentshipStatus) {
      throw new Error("Document not found");
    }

    // Convert the MongoDB _id field and other IDs to string
    const stringifiedStudentshipStatus = {
      ...studentshipStatus.toObject(),
      _id: studentshipStatus._id.toString(), // Convert _id to string
      user: studentshipStatus.user.toString(),
    };

    // console.log(stringifiedWorkReference);

    return stringifiedStudentshipStatus;
  } catch (error: any) {
    console.error(error);
    throw new Error(
      `Failed to fetch StudentshipStatus document with ID: ${docId}`,
    );
  }
}

export async function getIssuedWorkReference() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Query the WorkReference collection based on orgId
    const workReferences = await WorkReferenceAdmin.find({
      issued: true,
    }).select("firstName lastName badgeUrl");

    // Format the data before returning to the frontend
    const formattedData = workReferences.map((doc) => ({
      heading: `Work Reference Veridaq to ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      link: doc.badgeUrl,
      textColor: "#38313A",
      bgColor: "#F4DBE4",
      outlineColor: "#897A8B",
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch issued WorkReference documents");
  }
}

export async function getIssuedMemberReference() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Query the WorkReference collection based on orgId
    const memberReferences = await MembershipReferenceAdmin.find({
      issued: true,
    }).select("firstName lastName badgeUrl");

    // Format the data before returning to the frontend
    const formattedData = memberReferences.map((doc) => ({
      heading: `Member Reference Veridaq to ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      link: doc.badgeUrl,
      textColor: "#FFFFFF",
      bgColor: "#38313A",
      outlineColor: "#C3B8D8",
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch issued memberReferences documents");
  }
}

export async function getIssuedStudentshipStatus() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Query the WorkReference collection based on orgId
    const studentshipStatus = await StudentshipStatusAdmin.find({
      issued: true,
    }).select("firstName lastName badgeUrl");

    // Format the data before returning to the frontend
    const formattedData = studentshipStatus.map((doc) => ({
      heading: `Studentship Status Veridaq to ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      link: doc.badgeUrl,
      textColor: "#38313A",
      bgColor: "#F26BBA",
      outlineColor: "#A593C5",
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch issued studentshipStatus documents");
  }
}

export async function getIssuedDocVerification() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Query the WorkReference collection based on orgId
    const docVerification = await DocumentVerificationAdmin.find({
      issued: true,
    }).select("firstName lastName badgeUrl");

    // Format the data before returning to the frontend
    const formattedData = docVerification.map((doc) => ({
      heading: `Document Verification Veridaq to ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      link: doc.badgeUrl,
      textColor: "#38313A",
      bgColor: "#AF8BA4",
      outlineColor: "#F4DBE4",
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch issued studentshipStatus documents");
  }
}

export async function getUserDoc() {
  try {
    connectToDB();

    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Get users with firstname, lastname, and MongoDB ID
    const users = await User.find({ onboarded: true }).select(
      "firstname lastname _id",
    );

    console.log("users", users);

    // Get organizations with orgName and MongoDB ID
    const organizations = await Organization.find({ onboarded: true }).select(
      "name _id",
    );

    console.log("organizations", organizations);

    // Map over users and create an array of user objects
    const mappedUsers = users.map((user) => ({
      userName: `${user.firstname} ${user.lastname}`,
      userType: "Individual",
      userId: user._id.toString(),
    }));

    console.log("mappedUsers", mappedUsers);

    // Map over organizations and create an array of organization objects
    const mappedOrganizations = organizations.map((org) => ({
      userName: org.name,
      userType: "Organization",
      userId: org._id.toString(),
    }));

    console.log("mappedOrganizations", mappedOrganizations);

    // Join both arrays together
    const allUsers = [...mappedUsers, ...mappedOrganizations];

    console.log("All users", allUsers);

    return allUsers;
  } catch (error: any) {
    console.error("Error querying DB for users", error);
    throw new Error(
      "An error occurred while trying to query DB for users",
      error,
    );
  }
}

export async function getTeamMembers() {
  try {
    const session = await getSession();

    if (!session || session.role !== "admin") {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    await connectToDB();

    // Query the Admin collection
    const roles = await Admin.find().select(
      "adminFirstName adminLastName role designation",
    );

    // Format the data before returning to the frontend
    const formattedData = roles.map((doc: IAdmin) => ({
      heading: `${doc.adminFirstName} ${doc.adminLastName}`,
      DocId: doc._id.toString(),
      role: doc.designation,
      roles: doc.role,
    }));

    console.log(formattedData);

    return formattedData;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch team members");
  }
}
