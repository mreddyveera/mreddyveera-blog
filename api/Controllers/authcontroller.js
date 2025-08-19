const signup=async(req,res)=>{
    let body=req.body;
    return res.status(200).json({message:body});

}
module.exports={signup};