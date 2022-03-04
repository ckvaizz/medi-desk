const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { sendOtpHelper, checkOtpHelper } = require("../helpers/otpHelper");

exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile });
    if (user) {
      bcrypt.compare(password, user.password).then((status) => {
        if (status) {
          if(user.status){

            let token = jwt.sign(
              { mobile: user.mobile, _id: user._id },
              "secret",
              { expiresIn: "365d" }
              );
              
              res.json({
                status: true,
                profile: {
                  user: {
                    name: user.name,
                    _id: user._id,
                    mobile: user.mobile,
                    role: user.role,
                  },
                  token,
                },
              });
            }else res.json({status:false,message:"Please verify your account"})
        } else res.json({ status: false, message: "Invalid login" });
      });
    } else res.json({ status: false, message: "Invalid login" });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.signup = async (req, res) => {
  try {
    let { name, mobile, password, role, shop } = req.body;

    if (await User.findOne({ mobile }))
      res.json({ status: false, message: "Number already used" });
    else {
      if (role == 2) {
        if (shop.name && shop.lisenceNO) {
          password = await bcrypt.hash(password, 10);
          await User.create({ name, mobile, password, role, shop });
          res.json({ status: true, message: "please contact admin.." });
        } else res.json({ status: false, message: "missing datas" });
      } else {
        password = await bcrypt.hash(password, 10);
        await User.create({ name, mobile, password, role });
        sendOtpHelper(mobile)
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
      }
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    checkOtpHelper(mobile,otp)
      .then(async (data) => {
        if (data.status === "approved") {
          if (
            (await User.updateOne({ mobile }, { status: true, otp }))
              .modifiedCount == 1
          )
            res.json({ status: true });
        } else res.json({ status: false, message: "Failed to verify" });
      })
      .catch((err) =>
        res.status(500).json({ status: false, message: "something went wrong" })
      );
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.createPassword = async (req, res) => {
  try {
    let { mobile, otp, password } = req.body;
    password = await bcrypt.hash(password, 10);
    if (
      (await User.updateOne({ mobile, otp }, { password })).modifiedCount == 1
    )
      res.json({ status: true });
    else res.json({ status: false, message: "Failed" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.verifyMobile=async(req,res)=>{
  try {
    const {mobile}=req.body
    let user = await User.findOne({mobile})
    if(user){
      sendOtpHelper(mobile)
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
    }else res.json({status:false,message:'Mobile not registered'})
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
}