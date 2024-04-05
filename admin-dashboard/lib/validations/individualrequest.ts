import { z } from "zod";

export const IndividualRequestValidation = z.object({
  email: z.string().min(1, {
    message: "Email must be at least 1 character.",
  }),
  typeOfRequest: z.string().min(1, {
    message: "Type of Request must be at least 1 character.",
  }),
  addresseeFullName: z.string().optional(),
  relationship: z.string().min(1, {
    message: "Document Type must be at least 1 characters.",
  }),
  yearsOfRelationship: z.date().max(new Date(), {
    message: "Years of Relationship must be a valid date in the past.",
}),
  personalityReview: z.string().min(10, {
    message: "Personality Review must be at least 10 characters.",
  }),
  recommendationStatement: z.string().min(12, {
    message: "Recommendation Statement must be at least 12 character.",
  }),
});