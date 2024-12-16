import mongoose from "mongoose";

const checkpointOneSchema = new mongoose.Schema(
  {
    primaryIdea: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
      description: "Primary idea or concept behind the hackathon project",
    },
    role: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
      description: "Description of the user's role during the hackathon",
    },
    domainsWorkingOn: {
      type: [String],
      validate: [arrayLimit, "You have to select at least three domains."],
      description:
        "Array of domains the user is working on, must select at least three",
    },
    technologiesUsed: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 500,
      description: "Technologies and frameworks used during the project",
    },
    file: {
      type: String,
      description:
        "Optional array of file paths for attached files/presentations",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      description: "Timestamp when the form was submitted",
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length >= 3;
}

export default checkpointOneSchema;
