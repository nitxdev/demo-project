import mongoose, { Schema } from "mongoose";

const opportunitySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    organization: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Internship",
        "Hackathon",
        "Scholarship",
        "Research",
        "Workshop",
        "Fellowship",
        "Competition",
      ],
    },

    description: {
      type: String,
      required: true,
    },

    branch: {
      type: [String],
      default: [],
    },

    year: {
      type: [Number],
      default: [],
    },

    skills: {
      type: [String],
      default: [],
    },

    deadline: {
      type: Date,
      required: true,
    },

    applyLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Opportunity =
  mongoose.models.Opportunity ||
  mongoose.model("Opportunity", opportunitySchema);

export default Opportunity;