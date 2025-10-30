import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  GetBlogComment,
  togglePublish,
} from "../controllers/BlogControllers.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toogle-publish", auth, togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", GetBlogComment);
blogRouter.post("/generate", auth, generateContent);
export default blogRouter;
