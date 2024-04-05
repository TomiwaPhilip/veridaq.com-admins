import { Schema, model, models } from 'mongoose';

const OrganizationSchema = new Schema({
  name: {
    type: String,
    // unique: [true, 'Organization name already exists!'],
    // required: [true, 'Organization name is required!'],
  },
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  adminFirstName: {
    type: String,
  },
  adminLastName: {
    type: String,
  },
  street_address: {
    type: String,
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
    enum: ['nin', 'cacDoc', 'letter'],
  }
  // loginType: {
  //   type: String,
  //   enum: ['email', 'google', 'linkedin'],
  //   required: [true, 'The login type is required']
  // }
});

const Organization = models.Organization || model("Organization", OrganizationSchema);

export default Organization;