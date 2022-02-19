const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let users = new Schema({
  name: String,
  mobile: Number,
  password: String,
  status: {type:Boolean,default:false},
  regDate: { type: Date, default: new Date() },
  role: { type: Number, default: 3 },
  shop: {
    name: String,
    email: String,
    lisenceNO: String,
  },
  otp: String,
});

const model = mongoose.model("Users", users);

module.exports = model;
