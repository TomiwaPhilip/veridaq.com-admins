import { Schema, model, models } from 'mongoose';

const AdminSchema = new Schema({
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
  image: {
    type: String,
  },
  // loginType: {
  //   type: String,
  //   enum: ['email', 'google', 'linkedin'],
  //   required: [true, 'The login type is required']
  // }
});

const Admin = models.Admin || model("Admin", AdminSchema);

export default Admin;