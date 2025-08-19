const userModel=require('../models/usermodel.js');
const bcrypt=require('bcryptjs');
const errorHandler = require('../utils/error.js');
const signup=async(req,res,next)=>{
    //Accessing the body of a post request

    const {username,email,password}=req.body;
    if(!username || !email || !password ||username==="" ||email==="" || password===""){
        next(errorHandler(400,"All fields are required"));
    }
    //USING BCRYPT MODULE TO HASHING THE PASSWORDS
    const hashedPassword=bcrypt.hashSync(password,10);
    try{
    const newUser=new userModel({
        username,
        email,
        password:hashedPassword
    });
    await newUser.save();
    return res.status(201).json({message:`New user ${username} has been created successfully`});
}
//passing the error to next object
catch(e){
    next(e);
}

}
module.exports={signup};