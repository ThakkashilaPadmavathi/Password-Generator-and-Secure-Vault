import mongoose from "mongoose";

const vaultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  username: String,
  password: String, // encrypted
  url: String,
  notes: String
});

export default mongoose.model("VaultItem", vaultSchema);
