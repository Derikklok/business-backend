import mongoose from "mongoose";

const businessProfileSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },

    address: {
      type: String,
      required: true,
    },

    contactNumbers: {
      type: [String],
      required: true,
    },

    emailAddresses: {
      type: [String], // ✅ NEW
      required: true,
    },

    logo: {
      type: String,
    },
  },
  { timestamps: true },
);

export const BusinessProfile = mongoose.model(
  "BusinessProfile",
  businessProfileSchema,
);
