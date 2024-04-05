import { Schema, model, models } from 'mongoose';

const WorkReferenceSchema = new Schema({
  orgId: {
    type: String,
    required: [true, 'Organization ID is required'],
  },
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
  middleName: String,
  employeeType: {
    type: String,
    required: [true, 'Employee Type is required'],
  },
  subType: {
    type: String,
    required: [true, 'Sub Type is required'],
  },
  staffId: {
    type: String,
    required: [true, 'Staff ID is required'],
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
  },
  workStartDate: {
    type: Date,
    required: [true, 'Work Start Date is required'],
  },
  workEndDate: {
    type: Date,
    default: null,
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
  },
  notableAchievement: String,
  jobFunction: {
    type: String,
    required: [true, 'Function is required'],
  },
  personalitySummary: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true, // Assuming a WorkReference must be associated with a User
  },
});

// Create and export the Mongoose model based on the schema
const WorkReference = models.WorkReference || model("WorkReference", WorkReferenceSchema);


export default WorkReference;
