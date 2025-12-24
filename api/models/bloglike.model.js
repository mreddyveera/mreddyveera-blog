import mongoose from "mongoose";
const likeSchema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
   blogid: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Blog'
},
   
},{timestamps:true});

const BlogLikeModel=mongoose.model('BlogLike',likeSchema,'bloglikes');
export default BlogLikeModel;