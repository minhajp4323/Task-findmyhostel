import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "paid"], default: "pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  billType: { type: String, enum: ["security", "other"], required: true },
});

export const Bill = mongoose.model('Bill', billSchema);
