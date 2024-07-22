import { Schema, model, models } from 'mongoose';

const MembershipReferenceSchema = new Schema({
    orgId: { type: String, required: true, minlength: 1 },
    firstName: { type: String, required: true, minlength: 1 },
    lastName: { type: String, required: true, minlength: 1 },
    middleName: String,
    id: { type: String, required: true, minlength: 1 },
    info: { type: String, required: true, minlength: 1 },
    image: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: true, // Assuming a StudentshipStatusAdmin must be associated with a User
      },
  });
  
  // Create and export the Mongoose model based on the schema
  const MembershipReference = models.MembershipReference || model("MembershipReference", MembershipReferenceSchema);
  
  export default MembershipReference;