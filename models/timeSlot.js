const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let slots = new Schema({
  shopId: ObjectId,
  day: { type: String, default: new Date().toLocaleDateString() },
  cart:Array,
  time:String,
  name:String
});

const model = mongoose.model("Slot", slots);

module.exports = model;
