import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema(
  {
    description: String,

    unitPrice: Number,

    quantity: Number,

    unitType: {
      type: String,
      enum: ["unit", "weight", "volume"],
      default: "unit",
    },

    value: Number,

    notes: String,
  },
  { _id: true }
);

const inventorySchema = new mongoose.Schema(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
      unique: true, // One inventory per document
    },

    items: [inventoryItemSchema],

    subtotal: Number,

    discount: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    finalTotal: Number,

    currency: {
      type: String,
      default: "LKR",
    },

    paymentOption: String,

    paymentInfo: String,

    status: {
      type: String,
      enum: ["draft", "finalized"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);
