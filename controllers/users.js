const  User =require('../models/user')
const Medi =require('../models/medi')
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
    try {
        const {_id}=req.body
        if((await User.deleteOne({_id})).deletedCount===1){
            await Medi.deleteMany({shopId:_id})
            res.json({status:true})
        }else{
            res.json({status:false,message:'Failed to delete'})
        }
    } catch (error) {
        res.json({status:false,message:'something went wrong'})
    }
}

exports.approveSk=async(req,res)=>{
    try {
        const {_id}= req.body
        if((await User.updateOne({_id},{status:true})).modifiedCount==1)
            res.json({status:true})
        else res.json({status:false,message:'Failed to approve'})
    } catch (error) {
        res.json({status:false,message:'something wrong'})
    }
}

exports.getDetails=async(req,res)=>{
try {
    const {id} = req.params
    const user = await User.findOne({_id:id})
    res.json({status:true,shop:user.shop})
} catch (error) {
    res.json({status:false,message:'something went wrong'})
}
}

exports.editProfile=async(req,res)=>{
try {
    const {_id,shop,name,mobile}=req.body
    if((await User.updateOne({_id},{shop,name,mobile})).modifiedCount ==1){
        res.json({status:true})
    }else{
        res.json({status:false,message:'something wrong'})
    }

} catch (error) {
    res.json({status:false,message:'somthing wrong'})
}
}