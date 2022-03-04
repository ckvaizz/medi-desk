var express = require("express");
var router = express.Router();
const {
  loginValidator,
  signupValidator,
  otpValidator,
  createPasswordValidator,
  verifyMobileValidator,
} = require("../middleware/validator");
const { checkValidator } = require("../middleware/auth");
const { login, signup, verifyOTP, createPassword, verifyMobile } = require("../controllers/auth");



router.post("/login", loginValidator, checkValidator, login);

router.post("/signup", signupValidator, checkValidator, signup);

router.post("/verify-otp", otpValidator, checkValidator, verifyOTP);

router.post("/create-password",createPasswordValidator,checkValidator,createPassword)

router.post("/verify-mobile",verifyMobileValidator,checkValidator,verifyMobile)
module.exports = router;
