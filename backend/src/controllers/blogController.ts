import { Request, Response } from "express";
import Blog from "../Models/Blog";

// Create a new blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, category, content } = req.body;
    if (!title || !category || !content) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const blog = await Blog.create({ title, category, content });
    res.status(201).json({ success: true, message: "Blog created successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all blogs
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
