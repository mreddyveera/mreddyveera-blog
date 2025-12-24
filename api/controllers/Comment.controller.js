import { handleError } from "../helpers/handleError.js";
import Comment from "../models/comment.model.js";

export const addComment = async (req, res, next) => {
  try {
    
    const { user, blogid, comment } = req.body;
    const newComment = new Comment({
      user: user,
      blogid: blogid,
      comment: comment,
    });
    await newComment.save();
    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getComments = async (req, res, next) => {
  try {
    const {blogid}=req.params;
   
     const comments = await Comment.find({ blogid })
      .populate('user','name avatar')
      .sort({ createdAt: -1 })
      .lean()
      .exec();
      return res.status(200).json({
        comments
      })
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const commentCount = async (req, res, next) => {
  try {
    const {blogid}=req.params;
  
     const commentCount = await Comment.countDocuments({blogid});
      
      return res.status(200).json({
        commentCount
      })
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllComments = async (req, res, next) => {
  try {
     const comments = await Comment.find()
     .populate("user","name avatar")
     .populate("blogid", "title slug")
     .sort({createdAt:-1})
     .lean();
      return res.status(200).json({
        comments
      })
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const {commentid}=req.params;
     const comments = await Comment.findByIdAndDelete(commentid);
     
      return res.status(200).json({
        success:true,
        message:"Deleted Successfully"
      })
  } catch (error) {
    next(handleError(500, error.message));
  }
};
