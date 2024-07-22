import { Schema, model, models } from "mongoose";

const HandsOnReferenceAdminSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    minlength: 1,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    minlength: 1,
  },
  middleName: String,
  roleType: {
    type: String,
    required: [true, "Employee Type is required"],
  },
  subType: {
    type: String,
    required: [true, "Sub Type is required"],
  },
  identifier: {
    type: String,
    required: [true, "Identifier is required"],
  },
  projectTitle: {
    type: String,
    required: [true, "Project Title is required"],
  },
  image: {
    type: String,
  },
  workStartDate: {
    type: Date,
    required: [true, "Work Start Date is required"],
  },
  workEndDate: {
    type: Date,
    default: null,
  },
  role: {
    type: String,
    required: [true, "Department is required"],
  },
  notableAchievement: String,
  roleResponsibilities: {
    type: String,
    required: [true, "Role Responsilities is required"],
  },
  personalitySummary: String,
  orgName: {
    type: String,
    required: [true, "Organization Name is required"],
    minlength: 1,
  },
  orgAddress: {
    type: String,
    required: [true, "Organization Address is required"],
    minlength: 1,
  },
  orgPostalCode: {
    type: String,
  },
  orgCountry: {
    type: String,
    required: [true, "Organization Country is required"],
    minlength: 1,
  },
  orgEmail: {
    type: String,
    required: [true, "Organization Email is required"],
    minlength: 1,
  },
  orgPhone: {
    type: String,
    required: [true, "Organization Phone Number is required"],
    minlength: 1,
  },
  contactName: {
    type: String,
    required: [true, "Contact Person Name is required"],
    minlength: 1,
  },
  contactAddress: {
    type: String,
    required: [true, "Contact Person Address is required"],
    minlength: 1,
  },
  contactPostalCode: {
    type: String,
    required: [true, "Contact Person Postal Code is required"],
    minlength: 1,
  },
  contactCountry: {
    type: String,
    required: [true, "Contact Person Country is required"],
    minlength: 1,
  },
  contactEmail: {
    type: String,
    required: [true, "Contact Person Email is required"],
    minlength: 1,
  },
  contactPhone: {
    type: String,
    required: [true, "Contact Person Phone number is required"],
    minlength: 1,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
    required: true, // Assuming a WorkReference must be associated with a User
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
const HandsOnReferenceAdmin =
  models.HandsOnReferenceAdmin ||
  model("HandsOnReferenceAdmin", HandsOnReferenceAdminSchema);

export default HandsOnReferenceAdmin;