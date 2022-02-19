const { check } = require("express-validator");

module.exports = {
  loginValidator: [
    check("mobile").isMobilePhone(),
    check("password").trim().isLength({ min: 3 }),
  ],
  signupValidator: [
    check("mobile").isMobilePhone(),
    check("name").trim().isLength({ min: 3 }),
    check("password").trim().isLength({ min: 3 }),
    check("role").trim().isIn([2, 3]),
    check("shop").optional().isObject(),
  ],
  otpValidator: [check("mobile").isMobilePhone(), check("otp").isLength(4)],
  createPasswordValidator: [
    check("mobile").isMobilePhone(),
    check("otp").isLength(4),
    check("password").trim().isLength({ min: 3 }),
  ],
};
