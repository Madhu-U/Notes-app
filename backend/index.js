import "dotenv/config";
import jwt from "jsonwebtoken";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import User from "./models/user.model.js";
import Note from "./models/note.model.js";
import { authenticateToken } from "./utils/auth.js";

// Connect to the database
connectDB();

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ error: false, data: "Hello!" });
});

// create account route
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res.status(400).json({
      error: true,
      message: "Full Name is required",
    });
  }

  if (!email) {
    return res.status(400).json({
      error: true,
      message: "email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      error: true,
      message: "password is required",
    });
  }

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res.json({
      error: true,
      message: "User already exists",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN, {
    expiresIn: "7d",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

// login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });
  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.email === email && userInfo.password === password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {
      expiresIn: "7d",
    });

    return res.json({
      error: false,
      email,
      accessToken,
      message: "Login Successful",
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid credentials",
    });
  }
});

// get user
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const userInfo = await User.findOne({ _id: user._id });
  if (!userInfo) return res.sendStatus(401);

  return res.json({
    error: false,
    message: "User retrieval successful",
    user: {
      fullName: userInfo.fullName,
      email: userInfo.email,
      _id: userInfo._id,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
    },
  });
});

// add note route
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) return res.status(400).json({ message: "Title is required" });
  if (!content) return res.status(400).json({ message: "Content is required" });

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Sever Error",
    });
  }
});

// edit note route
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const { title, content, tags, isPinned } = req.body;
  const noteId = req.params.noteId;
  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "No changes in the note" });
  }

  try {
    const note = await Note.findOne({ _id: noteId });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
});

// get all notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;
  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.json({
      error: false,
      notes,
      message: "Retrieved all notes",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// delete note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;
  const note = await Note.findOne({ _id: noteId, userId: user._id });
  if (!note) return res.status(400).json({ message: "Note not found" });

  try {
    await Note.deleteOne({ _id: noteId, userId: user._id });
    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

// update isPinned
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { isPinned } = req.body;
  const noteId = req.params.noteId;

  if (!isPinned) return res.status(400).json({ message: "No Changes made" });

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    note.isPinned = isPinned;
    await note.save();
    return res.json({
      error: false,
      note,
      message: "isPinned updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Search Query
app.get("/search-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;
  if (!query)
    return res
      .status(400)
      .json({ error: true, message: "Search query missing" });

  try {
    const regex = new RegExp(query, "i");
    const notes = await Note.find({
      userId: user._id,
      $or: [{ title: regex }, { content: regex }],
    });
    return res.json({
      error: false,
      notes,
      message: "Search notes retrieved successfully",
    });
  } catch (error) {
    return res.json({ error: true, message: "Internal server error" });
  }
});

// Listen at port 8000;
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});

export default app;
