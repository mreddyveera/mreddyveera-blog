import { handleError } from "../helpers/handleError.js";
import BlogLikeModel from "../models/bloglike.model.js";
export const doLike = async (req, res, next) => {
  try {
    const { blogid, userid } = req.body;


    const existingLike = await BlogLikeModel.findOne({
      blogid,
      userid: userid,
    });

    let liked;

    if (existingLike) {
      // UNLIKE
      await BlogLikeModel.deleteOne({ _id: existingLike._id });
      liked = false;
    } else {
      // LIKE
      await BlogLikeModel.create({
        blogid,
        userid: userid,
      });
      liked = true;
    }

    const likeCount = await BlogLikeModel.countDocuments({ blogid });

    res.status(200).json({
      likeCount,
      liked, // FINAL STATE (this is what frontend trusts)
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const likeCount = async (req, res, next) => {
  try {
    const { blogid, userid } = req.params;

    const likeCount = await BlogLikeModel.countDocuments({ blogid });

    let liked = false;
    if (userid) {
      const exists = await BlogLikeModel.exists({
        blogid,
        user: userid,
      });
      liked = !!exists;
    }

    res.status(200).json({
      likeCount,
      liked,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
