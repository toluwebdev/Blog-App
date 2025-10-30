import fs from "fs";
import Blog from "../models/Blog.js";
import imagekit from "../configs/imagekit.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;
    //   check if all field are present
    if (!title || !description || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const fileBuffer = fs.readFileSync(imageFile.path);
    // Upload Imag to imageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });
    // optimization through imageKit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, //Auto compression
        { format: "webp" }, //Convert to modern format
        { width: "1280" }, //width resizing
      ],
    });
    const image = optimizedImageUrl;
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });
    res.status(200).json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);
    // Delete all comments associated with the blog
    await Comment.deleteMany({ blog: id });
    res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog Status updated",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res
      .status(200)
      .json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const GetBlogComment = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt +
        "Generate a blog content for this topic in simple text format just go straight to the point i dont need you to tell me Here's a blog post "
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
