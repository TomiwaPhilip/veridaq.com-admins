import { z } from "zod";

export const TeamMemberValidation = z.object({
  firstName: z.string().min(1, {
    message: "Firstname must be at least 1 character.",
  }),
  lastName: z.string().min(1, {
    message: "Lastname must be at least 1 character.",
  }),
  designation: z.string().min(1, {
    message: "Designation must be at least 1 character.",
  }),
  role: z.string().min(1, {
    message: "Role must be at least 1 character.",
  }),
  email: z.string().min(3, {
    message: "Email must be at least 3 characters.",
  }),
  image: z.string().url(),
});
