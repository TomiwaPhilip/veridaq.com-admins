import { Schema, model, models } from "mongoose";

// Define the Mongoose schema based on the Zod schema
const MembershipReferenceAdminSchema = new Schema({
  firstName: { type: String, required: true, minlength: 1 },
  lastName: { type: String, required: true, minlength: 1 },
  middleName: String,
  id: { type: String, required: true, minlength: 1 },
  memberSince: { type: Date, required: true, max: Date.now() },
  image: String,
  alumniCategory: String,
  info: { type: String, required: true, minlength: 1 },
  orgName: { type: String, required: true, minlength: 1 },
  orgAddress: { type: String, required: true, minlength: 1 },
  orgPostalCode: { type: String, required: true, minlength: 1 },
  orgCountry: { type: String, required: true, minlength: 1 },
  orgEmail: { type: String, required: true, minlength: 1 },
  orgPhone: { type: String, required: true, minlength: 1 },
  contactName: { type: String, required: true, minlength: 1 },
  contactAddress: { type: String, required: true, minlength: 1 },
  contactPostalCode: { type: String, required: true, minlength: 1 },
  contactCountry: { type: String, required: true, minlength: 1 },
  contactEmail: { type: String, required: true, minlength: 1 },
  contactPhone: { type: String, required: true, minlength: 1 },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
    required: true, // Assuming a StudentshipStatusAdmin must be associated with a User
  },
  issued: {
    type: Boolean,
    default: false,
    required: true,
  },
  dateIssued: {
    type: Date,
    default: Date.now,
  },
  dateRequested: {
    type: Date,
    default: Date.now,
  },
  badgeUrl: {
    type: String,
    default: null,
  },
  issuingAdminDetails: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

// Create and export the Mongoose model based on the schema
const MembershipReferenceAdmin =
  models.MembershipReferenceAdmin ||
  model("MembershipReferenceAdmin", MembershipReferenceAdminSchema);

export default MembershipReferenceAdmin;