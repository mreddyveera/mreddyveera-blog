import express from "express";
import { doLike, likeCount } from "../controllers/BlogLike.controller.js";
import { authenticate } from "../middleware/authenticate.js";


const BlogLikeRoute=express.Router();
BlogLikeRoute.post("/dolike",doLike);
BlogLikeRoute.get("/get-like/:blogid/:userid",likeCount);


export default BlogLikeRoute;