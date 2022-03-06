const  User =require('../models/user')

exports.getShopkeepers=async(req,res)=>{
    try {
        const {status}= req.body
        const users = await User.find({status,role:2})
        res.json({status:true,users})
    } catch (error) {
        res.json({status:false,message:"something went wrong"})
    }
}

exports.deleteUser=async(req,res)=>{
    try
}