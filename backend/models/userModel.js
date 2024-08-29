import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ["admin", "tenant"], required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ["active", "vecated"], default: "active" },
  bills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bill" }],
});

export const User = mongoose.model("User", userSchema);
