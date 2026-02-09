import mongoose from "mongoose";

const documentNoCounterSchema = new mongoose.Schema(
  {
    documentType: {
      type: String,
      required: true,
      unique: true,
    },

    year: {
      type: Number,
      required: true,
    },

    seq: {
      type: Number,
      default: 60, // start from 060
    },
  },
  { timestamps: true }
);

export const DocumentCounter = mongoose.model(
  "DocumentCounter",
  documentNoCounterSchema
);
