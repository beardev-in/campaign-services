import mongoose from "mongoose";

import profileSchema from "./Profile.js";
import checkpointOneSchema from "./CheckpointOne.js";
import checkpointTwoSchema from "./CheckpointTwo.js";
import checkpointThreeSchema from "./CheckpointThree.js";
import checkpointFourSchema from "./CheckpointFour.js";
import checkpointFiveSchema from "./CheckpointFive.js";

const hackerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    track: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teams",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teams",
    },
    phonenumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: "hacker",
    },
    phoneverified: {
      type: Boolean,
      default: false,
    },
    emailverified: {
      type: Boolean,
      default: false,
    },
    checkpointsstatus: {
      type: [Boolean],
      default: [],
    },
    // profile: {
    //   type: profileSchema,
    //   description: "Profile form data",
    // },
    profileStatus: {
      type: Boolean,
      default: false,
    },
    // checkpointone: {
    //   type: checkpointOneSchema,
    //   description: "Checkpoint one form data",
    // },
    // checkpointtwo: {
    //   type: checkpointTwoSchema,
    //   description: "Checkpoint two form data",
    // },
    // checkpointthree: {
    //   type: checkpointThreeSchema,
    //   description: "Checkpoint three form data",
    // },
    // checkpointfour: {
    //   type: checkpointFourSchema,
    //   description: "Checkpoint four form data",
    // },
    // checkpointfive: {
    //   type: checkpointFiveSchema,
    //   description: "Checkpoint five form data",
    // },
  },
  {
    timestamps: true,
  }
);

const Hacker = mongoose.model("Hacker", hackerSchema, "hackers");

export default Hacker;
