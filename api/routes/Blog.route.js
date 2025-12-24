import express from "express";
import { addBlog, deleteBlog, editBlog, getBlogByCategory, getBlogBySlug, getRelatedBlogs, search, showAllBlogs, updateBlog } from "../controllers/Blog.controller.js";
import upload from "../config/multer.js";
import { authenticate } from "../middleware/authenticate.js";

const BlogRoute=express.Router();

BlogRoute.post("/add",upload.single('file'), addBlog);
BlogRoute.get("/edit/:blogid",authenticate, editBlog);
BlogRoute.put("/update/:blogid",authenticate, upload.single('file'),updateBlog);
BlogRoute.delete("/delete/:blogid",authenticate, deleteBlog);
BlogRoute.get("/get-all",showAllBlogs);

BlogRoute.get("/get-blog/:slug",getBlogBySlug);
BlogRoute.get("/get-relatedblog/:category/:slug",getRelatedBlogs);
BlogRoute.get("/get-blog-by-category/:category",getBlogByCategory);
BlogRoute.get("/search",search);
export default BlogRoute;