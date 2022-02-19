var express = require("express");
var router = express.Router();
const {
  loginValidator,
  signupValidator,
  otpValidator,
  createPasswordValidator,
} = require("../middleware/validator");
const { checkValidator } = require("../middleware/auth");
const { login, signup, verifyOTP, createPassword } = require("../controllers/auth");



router.post("/login", loginValidator, checkValidator, login);

router.post("/signup", signupValidator, checkValidator, signup);

router.post("/verify-otp", otpValidator, checkValidator, verifyOTP);

router.post("/create-password",createPasswordValidator,checkValidator,createPassword)

module.exports = router;
