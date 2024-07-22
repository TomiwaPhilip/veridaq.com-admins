import { Schema, model, models } from 'mongoose';

const DocumentVerificationSchema = new Schema({
    orgId: { type: String, required: true, minlength: 1 },
    firstName: { type: String, required: true, minlength: 1 },
    lastName: { type: String, required: true, minlength: 1 },
    middleName: String,
    documentType: { type: String, required: true, minlength: 1 },
    documentName: { type: String, required: true, minlength: 1 },
    id: { type: String, required: true, minlength: 1 },
    info: { type: String, required: true, minlength: 1 },
    image: { type: String, required: true, minlength: 1 },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: true, // Assuming a StudentshipStatusAdmin must be associated with a User
      },
  });
  
  // Create and export the Mongoose model based on the schema
  const DocumentVerification = models.DocumentVerification || model("DocumentVerification", DocumentVerificationSchema);
  
  export default DocumentVerification;