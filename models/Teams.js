import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamname: {
    type: String,
    required: true,
    trim: true,
  },
  finalscore: {
    type: Number,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hacker",
    },
  ],
});

const trackSchema = new mongoose.Schema({
  track: {
    type: String,
    required: true,
  },
  teams: [teamSchema],
});

const Teams = mongoose.model("Teams", trackSchema, "teams");

export default Teams;

