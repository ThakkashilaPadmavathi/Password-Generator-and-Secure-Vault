import express from "express";
import VaultItem from "../models/VaultItem.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE
router.post("/", protect, async (req, res) => {
  try {
    const newItem = await VaultItem.create({ ...req.body, userId: req.user.id });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ
router.get("/", protect, async (req, res) => {
  const items = await VaultItem.find({ userId: req.user.id });
  res.json(items);
});

// UPDATE
router.put("/:id", protect, async (req, res) => {
  const item = await VaultItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// DELETE
router.delete("/:id", protect, async (req, res) => {
  await VaultItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
