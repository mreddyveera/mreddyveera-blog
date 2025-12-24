import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
export const getUser = async (req, res, next) => {
  try {
    const { email } = req.params;
   
    const user = await User.findOne({ email: email });
    

    if (!user) {
      return next(handleError(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      message: "User data found",
      user,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    const data = JSON.parse(req.body.data);

    const user = await User.findOne({ email: email });

    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;

    // ✅ Only update password if provided
    if (
      data.password &&
      data.password.trim() !== "" &&
      data.password.length >= 8
    ) {
      user.password = bcryptjs.hashSync(data.password, 10);
    }
    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(
          req.file.path,
          {folder:'mreddyveera-mern-blog',resource_type:'auto'}
        )
        .catch((error) => {
          next(handleError(500,error.message));
        });
        user.avatar=uploadResult.secure_url;

      
    }
    await user.save();
    const newuser = user.toObject({ getters: true });
    delete newuser.password;

    return res.status(200).json({
      success: true,
      message: "Profile updated",
      user: newuser,
    });
  } catch (error) {
    next(handleError(500, "Internal Server Error"));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    
   
    const users = await User.find();
    

    if (!users) {
      return next(handleError(404, "Users not found"));
    }
    res.status(200).json({
      success: true,
      message: "User data found",
      users,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const {userid}=req.params;
     const users = await User.findByIdAndDelete(userid);
     
      return res.status(200).json({
        success:true,
        message:"Deleted Successfully"
      })
  } catch (error) {
    next(handleError(500, error.message));
  }
};
