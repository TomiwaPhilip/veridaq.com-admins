import { Schema, models, model } from 'mongoose';

// Define the Mongoose schema based on the Zod schema
const IndividualRequestSchema = new Schema({
  email: { type: String, required: true, minlength: 1 },
  typeOfRequest: { type: String, required: true, minlength: 1 },
  addresseeFullName: String,
  relationship: { type: String, required: true, minlength: 1 },
  yearsOfRelationship: { type: Date, required: true, max: new Date() }, // Adjusted line
  personalityReview: { type: String, required: true, minlength: 10 },
  recommendationStatement: { type: String, required: true, minlength: 12 },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true, // Assuming an IndividualRequest must be associated with a User
  }
});

// Create and export the Mongoose model based on the schema
const IndividualRequest = models.IndividualRequest || model("IndividualRequest", IndividualRequestSchema);

export default IndividualRequest;
