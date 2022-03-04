const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
var User = require("../models/user");
const { ObjectId } = require("mongodb");


exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret", (err, decodedData) => {
      if (err) {
        return res.status(401).json({ message: "isssue with secret", err });
      }

      req.userId = decodedData?._id;
      req.userMobile = decodedData?.mobile;
      
      console.log("AUTHORIZED USER");
      next();
    });
  } catch (error) {
    if (error) {
      console.log(error)
      res.json({ message: "no token" });
    }
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    User.findOne({ _id: ObjectId(req.userId) }).then((admin) => {
      console.log(admin);
      if (admin.role === 1) {
        console.log("VERIFIED ADMIN");
        next();
      } else {
        res
          .status(401)
          .json({ message: "You dont have permission to do this" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({status:false,message:"something went wrong"})
  }
};

exports.isShopkeeper = (req, res, next) => {
  try {
    User.findOne({ _id: ObjectId(req.userId) }).then((management) => {
      
      if (management.role === 2) {
        req.shopName=management?.shop?.name
        console.log("VERIFIED SHOPKEEPER");
        next();
      } else {
        res
          .status(401)
          .json({ message: "You dont have permission to do this" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({status:false,message:"something went wrong"})
  }
};

exports.checkValidator = (req, res, next) => {
    try {
      const errors = validationResult(req);
  
      if (errors.isEmpty()) next();
      else
        res.status(400).json({ status: false, message: " Missing some datas" });
    } catch (error) {
      res.status(500).json({ status: false, message: "something went wrong" });
    }
  };

