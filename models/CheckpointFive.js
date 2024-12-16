import mongoose from "mongoose";

const checkpointFiveSchema = new mongoose.Schema({
  skillsInProject: {
    type: [String],
    required: true,
    validate: {
      validator: (array) => array.length >= 1,
      message: "You have to select at least 1 skill.",
    },
    description: "Array of skills found most helpful during the hackathon",
  },
  otherSkillsInProject: {
    type: String,
    description: "Other skills in project, if any",
  },
  skillsToLearn: {
    type: [String],
    required: true,
    validate: {
      validator: (array) => array.length >= 1,
      message: "You have to select at least 1 learned skill.",
    },
    description:
      "Array of skills the user wishes they had more knowledge about",
  },
  otherSkillsToLearn: {
    type: String,
    description: "Other skills to learn, if any",
  },
  neededTools: {
    type: [String],
    required: true,
    validate: {
      validator: (array) => array.length >= 1,
      message: "You have to select at least 1 tool.",
    },
    description:
      "Array of tools or resources the user felt were needed but unavailable",
  },
  otherNeededTools: {
    type: String,
    description: "Other needed tools, if any",
  },
  challengesFaced: {
    type: [String],
    required: true,
    validate: {
      validator: (array) => array.length >= 1,
      message: "You have to select at least 1 challenge.",
    },
    description: "Array of challenges faced by the user",
  },
  otherChallengesFaced: {
    type: String,
    description: "Other challenges faced, if any",
  },
  additionalHelp: {
    type: [String],
    required: true,
    validate: {
      validator: (array) => array.length >= 1,
      message: "You have to select at least 1 help.",
    },
    description: "Array of additional help or resources the user needed",
  },
  otherAdditionalHelp: {
    type: String,
    description: "Other additional help, if any",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    description: "Timestamp when the form was submitted",
  },
});

export default checkpointFiveSchema;
