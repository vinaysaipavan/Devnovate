import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORTT || 5001;
const MONGO_URI = process.env.MONGO_DB;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI!)
  .then(() => console.log("MongoDB connected to Devnovate"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

// Routes
app.post("/api/blogs", async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const newBlog = new Blog({ title, category, content });
    await newBlog.save();
    res.status(201).json({ success: true, message: "Blog created!", blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
