import { z } from "zod";

export const StudentshipStatusValidation = z.object({
  orgId: z.string().min(1, {
    message: "Institution ID must be at least 1 character.",
  }),
  firstName: z.string().min(1, {
    message: "Last Name must be at least 1 character.",
  }),
  lastName: z.string().min(1, {
    message: "Last Name must be at least 1 character.",
  }),
  middleName: z.string().optional(), // Allow empty string
  currentLevel: z.string().min(1, {
    message: "Current Level must be at least 1 characters.",
  }),
  courseOfStudy: z.string().min(1, {
    message: "Sub Type must be at least 1 character.",
  }),
  studentId: z.string().min(1, {
    message: "Staff ID must be at least 1 character.",
  }),
  info: z.string().optional(),
  faculty: z.string().min(1, {
    message: "Faculty must be at least 1 character.",
  }), 
  entryYear: z.date().max(new Date(), {
    message: "Entry Year must be a valid date in the past.",
}),
  exitYear: z.date().optional(),
  image: z.string().url().min(1),
});

export const StudentshipStatusValidation2 = z.object({
    firstName: z.string().min(1, {
      message: "Last Name must be at least 1 character.",
    }),
    lastName: z.string().min(1, {
      message: "Last Name must be at least 1 character.",
    }),
    middleName: z.string().optional(), // Allow empty string
    currentLevel: z.string().min(1, {
      message: "Current Level must be at least 1 characters.",
    }),
    courseOfStudy: z.string().min(1, {
      message: "Sub Type must be at least 1 character.",
    }),
    studentId: z.string().min(1, {
      message: "Staff ID must be at least 1 character.",
    }),
    info: z.string().optional(),
    faculty: z.string().min(1, {
      message: "Faculty must be at least 1 character.",
    }), 
    entryYear: z.date().max(new Date(), {
      message: "Entry Year must be a valid date in the past.",
  }),
    exitYear: z.date().optional(),
    image: z.string().url().min(1),
  orgName: z.string().min(1, {
    message: "Organization Name must be at least 1 character.",
  }),
  orgAddress: z.string().min(1, {
    message: "Organization Address must be at least 1 character.",
  }),
  orgPostalCode: z.string().min(1, {
    message: "Organization Postal code must be at least 1 character.",
  }),
  orgCountry: z.string().min(1, {
    message: "Organization Country must be at least 1 character.",
  }),
  orgEmail: z.string().min(1, {
    message: "Organization Email must be at least 1 character.",
  }),
  orgPhone: z.string().min(1, {
    message: "Organization Phone Number must be at least 1 character.",
  }),
  contactName: z.string().min(1, {
    message: "Contact Person Name must be at least 1 character.",
  }),
  contactAddress: z.string().min(1, {
    message: "Contact Person Address must be at least 1 character.",
  }),
  contactPostalCode: z.string().min(1, {
    message: "Contact Person Postal Code must be at least 1 character.",
  }),
  contactCountry: z.string().min(1, {
    message: "Contact Person Country must be at least 1 character.",
  }),
  contactEmail: z.string().min(1, {
    message: "Contact Person Email must be at least 1 character.",
  }),
  contactPhone: z.string().min(1, {
    message: "Contact Person Phone number must be at least 1 character.",
  }),
  });