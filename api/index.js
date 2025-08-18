const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const userRoute=require('./Routes/userroute.js');
// The dotenv.config() function in a Node.js application reads a specified .env file, parses its contents, and injects the defined key-value pairs into the process.env object.
//  This allows the application to access these environment variables throughout its code using process.env.VARIABLE_NAME
dotenv.config();
//connectimng with database
mongoose.connect(process.env.mongo_url).then(console.log("Database connection established successfully"));
const app=express();
app.use(express.json());
app.use('/api',userRoute);
//starting a bacjend server using listen method
app.listen(4567,()=>{
    console.log(`Server started on server 4567vghgvghv`);
});