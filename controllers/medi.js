const Medi = require("../models/medi");

exports.addMedi = async (req, res) => {
  try {
    const { companyName, name, dose, stock, price } = req.body;
    const { userId, shopName } = req;
    await Medi.create({
      name,
      companyName,
      dose,
      stock,
      shopId: userId,
      shopName,
      price,
    });
    res.json({ status: true });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.editMedi = async (req, res) => {
  try {
    const { _id, companyName, name, dose, stock, price } = req.body;
    const { userId, shopName } = req;
    if (
      (
        await Medi.updateOne(
          { _id, shopId: userId },
          { companyName, name, dose, stock, price }
        )
      ).modifiedCount === 1
    )
      res.json({ status: true });
    else res.json({ status: false, message: "Failed to update" });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.deleteMedi = async (req, res) => {
  try {
    const { _id } = req.body;
    const { userId } = req;
    if ((await Medi.deleteOne({ _id, shopId: userId })).deletedCount === 1)
      res.json({ status: true });
    else res.json({ status: false, message: "Failed to delete" });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.getMedibyName=async(req,res)=>{
    try {
        const {data}=req.body
        const medis = await Medi.find({ name: { $regex: data, $options: "$i" } })
        res.json({status:true,medis})
    } catch (error) {
        res.status(500).json({ status: false, message: "something went wrong" });
    }
}

exports.getSksMedi=async(req,res)=>{
    try {
        const {userId}=req
        const medis= await Medi.find({shopId:userId})
        res.json({status:true,medis})
    } catch (error) {
        res.status(500).json({ status: false, message: "something went wrong" });
    }
}

exports.getSuggestion=async(req,res)=>{
    try {
        const {data}=req.body
        const suggestions = await Medi.find({ name: { $regex: data, $options: "$i" } }).select('name')
        res.json({status:true,suggestions})
    } catch (error) {
        res.status(500).json({ status: false, message: "something went wrong" });
    }
}