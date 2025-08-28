import { Router } from "express";
import { Note } from "../models/Note.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// GET notes
router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(notes);
});

// POST note
router.post("/", auth, async (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });
  const note = await Note.create({ user: req.userId, title, content });
  res.status(201).json(note);
});

// PUT note
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updated = await Note.findOneAndUpdate(
    { _id: id, user: req.userId },
    { $set: { title, content } },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Note not found" });
  res.json(updated);
});

// DELETE note
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const deleted = await Note.findOneAndDelete({ _id: id, user: req.userId });
  if (!deleted) return res.status(404).json({ message: "Note not found" });
  res.json({ message: "Deleted" });
});

export default router;
