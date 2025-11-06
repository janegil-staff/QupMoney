import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  currentAmount: {
    type: Number,
    default: 0,
  },
  targetAmount: { type: Number, required: true },
  month: { type: String, required: true }, // format: "2025-11"
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.models.Goal || mongoose.model("Goal", goalSchema);
