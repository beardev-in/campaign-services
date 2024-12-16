import mongoose from "mongoose";

// Define the schema for a profile
const profileSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  bio: { type: String },
  urls: {
    type: Object,
    required: true,
  },
});

// Export the model
export default profileSchema;
