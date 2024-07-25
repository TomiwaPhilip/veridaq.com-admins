import { z } from "zod";

export const HandsOnReferenceValidation = z.object({
  orgId: z.string().min(1, {
    message: "Organization ID must be at least 1 character.",
  }),
  firstName: z.string().min(1, {
    message: "First Name must be at least 1 character.",
  }),
  lastName: z.string().min(1, {
    message: "Last Name must be at least 1 character.",
  }),
  middleName: z.string().optional(), // Allow empty string
  roleType: z.string().min(1, {
    message: "Employee Type must be at least 1 characters.",
  }),
  subType: z.string().min(1, {
    message: "Sub Type must be at least 1 character.",
  }),
  identifier: z.string().min(1, {
    message: "Identifier must be at least 1 character.",
  }),
  projectTitle: z.string().min(1, {
    message: "Designation must be at least 1 character.",
  }),
  workStartDate: z.date().max(new Date(), {
    message: "Work Start Date must be a valid date in the past.",
  }),
  workEndDate: z.date().optional(),
  role: z.string().min(1, {
    message: "Department must be at least 1 character.",
  }),
  notableAchievement: z
    .string()
    .max(30, "Notable Achievement must be at most 40 characters")
    .optional(), // Allow empty string
  roleResponsibilities: z
    .string()
    .min(1, {
      message: "Function must be at least 1 character.",
    })
    .max(40, {
      message: "Function must be at most 40 characters.",
    }),
  personalitySummary: z
    .string()
    .max(30, "Personality Summary must be at most 40 characters")
    .optional(), // Allow empty
  image: z.string().url().optional(),
});

export const HandsOnReferenceValidation2 = z.object({
  firstName: z.string().min(1, {
    message: "Last Name must be at least 1 character.",
  }),
  lastName: z.string().min(1, {
    message: "Last Name must be at least 1 character.",
  }),
  middleName: z.string().optional(), // Allow empty string
  roleType: z.string().min(1, {
    message: "Employee Type must be at least 1 characters.",
  }),
  subType: z.string().min(1, {
    message: "Sub Type must be at least 1 character.",
  }),
  identifier: z.string().min(1, {
    message: "Identifier must be at least 1 character.",
  }),
  projectTitle: z.string().min(1, {
    message: "Designation must be at least 1 character.",
  }),
  workStartDate: z.date().max(new Date(), {
    message: "Work Start Date must be a valid date in the past.",
  }),
  workEndDate: z.date().optional(),
  role: z.string().min(1, {
    message: "Department must be at least 1 character.",
  }),
  notableAchievement: z
    .string()
    .max(95, "Notable Achievement must be at most 95 characters")
    .optional(), // Allow empty string
  roleResponsibilities: z
    .string()
    .min(40, {
      message: "Function must be at least 1 character.",
    })
    .max(148, {
      message: "Function must be at most 150 characters.",
    }),
  personalitySummary: z
    .string()
    .max(245, "Personaliy Summary must be at most 245 characters")
    .optional(), // Allow empty string
  image: z.string().url().optional(),
  orgName: z.string().min(1, {
    message: "Organization Name must be at least 1 character.",
  }),
  orgAddress: z.string().min(1, {
    message: "Organization Address must be at least 1 character.",
  }),
  orgPostalCode: z.string().optional(),
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
  contactPostalCode: z.string().optional(),
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
