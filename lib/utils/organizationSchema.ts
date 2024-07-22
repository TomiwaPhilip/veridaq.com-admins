import { Schema, model, models } from "mongoose";

const OrganizationSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  adminFirstName: {
    type: String,
  },
  adminLastName: {
    type: String,
  },
  streetAddress: {
    type: String,
    default: null,
  },
  city: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  country: {
    type: String,
  },
  image: {
    type: String,
  },
  onboarded: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  credentials: {
    type: String,
    default: null,
  },
  credentialsType: {
    type: String,
    enum: ["nin", "cacDoc", "letter"],
  },
  registered: {
    type: String,
    enum: ["true", "false"],
    default: "false",
  },
  walletBalance: {
    type: String,
    default: "0.00",
  },
  accountName: {
    type: String,
  },
  accountNumber: {
    type: Number,
  },
  bankCode: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: false,
  },
  studentStatusFee: {
    type: Number,
    default: "4000",
  },
  docVerificationFee: {
    type: Number,
    default: "6250",
  },
  membershipRefFee: {
    type: Number,
    default: "4000",
  }
});

const Organization =
  models.Organization || model("Organization", OrganizationSchema);

export default Organization;