// routes/blogRoutes.ts
import { Router } from "express";
import { createBlog, getAllBlogs } from "../controllers/blogController";

const router = Router();

router.post("/create", createBlog);
router.get("/", getAllBlogs);

export default router;
