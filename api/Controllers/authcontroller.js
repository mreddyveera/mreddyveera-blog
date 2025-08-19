const userModel=require('../models/usermodel.js');
const bcrypt=require('bcryptjs');
const signup=async(req,res)=>{
    //Accessing the body of a post request

    const {username,email,password}=req.body;
    if(!username || !email || !password ||username==="" ||email==="" || password===""){
        return res.status(400).json({message:"All fields are required"});
    }
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
catch(e){
    return res.status(400).json({message:e.message});
}

}
module.exports={signup};