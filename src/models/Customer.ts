import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: String,
  sequence_value: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const customerSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    contactPerson: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

// Auto-increment middleware for registrationNumber
customerSchema.pre("save", async function () {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "customerRegistration" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    
    // Format: [FM-001], [FM-002], etc.
    const sequenceNumber = String(counter.sequence_value).padStart(3, "0");
    this.registrationNumber = `[FM-${sequenceNumber}]`;
  }
});

export const Customer = mongoose.model("Customer", customerSchema);
