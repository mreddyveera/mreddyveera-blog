import express from "express";
import { deleteUser, getAllUsers, getUser,updateUser } from "../controllers/User.controller.js";
import upload from "../config/multer.js";
import { authenticate } from "../middleware/authenticate.js";

const UserRoute=express.Router();
UserRoute.get("/get-user/:email",getUser);
UserRoute.get("/get-all-users",getAllUsers);
UserRoute.put("/update-user/:email",upload.single('file'),updateUser);
UserRoute.delete("/delete-user/:userid",deleteUser);

export default UserRoute;