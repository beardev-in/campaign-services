import mongoose from "mongoose";

const checkpointTwoSchema = new mongoose.Schema(
  {
    projectStage: {
      type: String,
      enum: [
        "Planning and Design",
        "Initial Development",
        "Advanced Development",
        "Testing and Debugging",
      ],
      required: true,
    },
    teamCollaboration: {
      type: String,
      enum: [
        "All team members are actively contributing",
        "Some team members are not actively contributing",
        "Encountering team dynamics issues",
      ],
      required: true,
    },
    mentorshipSupport: {
      type: String,
      enum: [
        "Sufficient support received",
        "Need technical mentorship",
        "Need project management support",
      ],
      required: true,
    },
    timeline: {
      type: String,
      enum: ["On schedule", "Minor delays", "Significant delays"],
      required: true,
    },
    resources: {
      type: String,
      enum: ["Adequate resources", "Need additional tools/resources"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default checkpointTwoSchema;
