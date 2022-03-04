const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let medi = new Schema({
  name: String,
  companyName: String,
  shopName: String,
  dose:Array,
  regDate: { type: Date, default: new Date() },
  shopId: ObjectId,
  stock:Number,
  price:Number
  
});

const model = mongoose.model("Medi", medi);

module.exports = model;