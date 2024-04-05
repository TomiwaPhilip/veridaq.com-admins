import { z } from "zod";

export const MembershipReferenceValidation = z.object({
  orgId: z.string().min(1, {
    message: "Organization ID must be at least 1 character.",
  }),
  firstName: z.string().min(1, {
    message: "Last Name must be at least 1 character.",
  }),
  lastName: z.string().min(1, {
    message: "Last Name must be at least 1 character.",
  }),
  middleName: z.string().optional(), // Allow empty string
  id: z.string().min(1, {
    message: "Employee Type must be at least 1 characters.",
  }),
  info: z.string().min(1, {
    message: "Sub Type must be at least 1 character.",
  }),
  image: z.string().url().optional(),
});

export const MembershipReferenceValidation2 = z.object({
    firstName: z.string().min(1, {
      message: "Last Name must be at least 1 character.",
    }),
    lastName: z.string().min(1, {
      message: "Last Name must be at least 1 character.",
    }),
    middleName: z.string().optional(), // Allow empty string
    id: z.string().min(1, {
      message: "Employee Type must be at least 1 characters.",
    }),
    info: z.string().min(1, {
      message: "Sub Type must be at least 1 character.",
    }),
    image: z.string().url().optional(),
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