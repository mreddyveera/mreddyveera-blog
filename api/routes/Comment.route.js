import express from "express";
import { addComment, commentCount, deleteComment, getAllComments, getComments } from "../controllers/Comment.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { onlyAdmin } from "../middleware/onlyAdmin.js";


const CommentRoute=express.Router();
CommentRoute.post("/add", addComment);
CommentRoute.get("/get/:blogid",getComments);
CommentRoute.get("/get-count/:blogid",commentCount);
CommentRoute.get("/get-all-comment",getAllComments);
CommentRoute.delete("/delete-comment/:commentid",onlyAdmin,deleteComment);

export default CommentRoute;