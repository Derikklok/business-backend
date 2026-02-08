import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },

    paidDate: {
      type: Date,
    },
  },
  { _id: false }
);

const signatureSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const documentSchema = new mongoose.Schema(
  {
    documentType: {
      type: String,
      enum: ["invoice", "estimate", "purchase_order", "rental_proposal"],
      required: true,
    },

    documentNo: {
      type: String,
      required: true,
      unique: true,
    },

    mentionedDate: {
      type: Date,
      required: true,
    },

    documentTitle: {
      type: String,
      required: true,
    },

    specialNotes: {
      type: String,
    },

    termsAndConditions: {
      type: String,
    },

    signature: {
      type: signatureSchema,
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "completed"],
      default: "draft",
    },

    transactionInfo: {
      type: transactionSchema,
      required: true,
    },

    documentAuthor: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

export const Document = mongoose.model("Document", documentSchema);
