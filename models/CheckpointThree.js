import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    minlength: 1,
    description: "Progress update or technical challenge description",
  },
});

const checkpointThreeSchema = new mongoose.Schema({
  progressUpdate: {
    type: [updateSchema],
    description: "Array of progress updates provided by the user",
  },
  technicalChallenges: {
    type: [updateSchema],
    description: "Array of technical challenges faced by the user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    description: "Timestamp when the form was submitted",
  },
});

export default checkpointThreeSchema;
