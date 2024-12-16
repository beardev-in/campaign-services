import mongoose from "mongoose";

const checkPointFourSchema = new mongoose.Schema(
  {
    featureCompletion: {
      type: String,
      enum: [
        "All key features implemented",
        "Most key features implemented",
        "Struggling with key features",
      ],
      required: true,
    },
    integrationTesting: {
      type: String,
      enum: [
        "Integration complete",
        "Integration in progress",
        "Integration not started",
      ],
      required: true,
    },
    userExperience: {
      type: String,
      enum: [
        "Finalized UX/UI",
        "UX/UI needs refinement",
        "UX/UI not addressed",
        "We got a hardware prototype",
      ],
      required: true,
    },
    qualityAssurance: {
      type: String,
      enum: [
        "Comprehensive testing done",
        "Initial testing done",
        "Testing has not started",
      ],
      required: true,
    },
    presentationPreparation: {
      type: String,
      enum: [
        "Presentation ready",
        "Working on presentation",
        "Presentation not started",
      ],
      required: true,
    },
    teamReadiness: {
      type: String,
      enum: [
        "Confident in our project",
        "Somewhat confident, need more rehearsal",
        "Not confident, need significant help",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default checkPointFourSchema;
