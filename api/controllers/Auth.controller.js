import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      //User Already Registered
      next(handleError(409, "User Already Registered."));
    }
    const hashPassword = bcryptjs.hashSync(password, 10);

    //Register the user
    const user = new User({
      name: name,
      email: email,
      password: hashPassword,
    });
    await user.save();
    return res.status(201).json({
      success: true,
      message: "Registration successfull.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      next(handleError(404, "Invalid Login Credentials"));
    }
    const hashedPassword = user.password;
    const comparedPassword = bcryptjs.compare(password, hashedPassword);
    if (!comparedPassword) {
      next(handleError(404, "Invalid login credentials."));
    }
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      process.env.JWT_SECRET
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/" ,
    });
   

    const newuser = user.toObject({ getters: true });
    delete newuser.password;
    res.status(200).json({
      success: true,
      newuser,
      message: "Login Successfull",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const GoogleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      //create new user
      const password = Math.round(Math.random() * 100000).toString();
      const hashedPassword = bcryptjs.hashSync(password);
      const newUser = new User({
        email: email,
        password: hashedPassword,
        avatar: avatar,
        name: name,
      });
      user = await newUser.save();
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });
    const newuser = user.toObject({ getters: true });
    delete newuser.password;
    res.status(200).json({
      success: true,
      user: newuser,
      message: "Login Successfull",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const Logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });
    res.status(200).json({
      success: true,
      message: "LogOut Successfull",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
