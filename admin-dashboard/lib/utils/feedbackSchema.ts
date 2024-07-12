import { Schema, model, models } from "mongoose";

const FeedBackSchema = new Schema({
  message: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const FeedBack = models.Feedback || model("FeedBack", FeedBackSchema);

export default FeedBack;
