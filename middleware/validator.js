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
  verifyMobileValidator: [check("mobile").isMobilePhone()],
  addMediValidator: [
    check("name").trim().isLength({ min: 3 }),
    check("companyName").trim().exists().notEmpty(),
    check("dose").isArray(),
    check("stock").trim().exists().notEmpty(),
    check("price").trim().exists().notEmpty()
  ],
  editMediValidator:[
    check("_id").isMongoId(),
    check("name").trim().isLength({ min: 3 }),
    check("companyName").trim().exists().notEmpty(),
    check("dose").isArray(),
    check("stock").trim().exists().notEmpty(),
    check("price").trim().exists().notEmpty()
  ],
  idValidator:[
    check("_id").isMongoId()
  ],
  suggestionValidator:[
    check('data').trim().exists().notEmpty()
  ],
  statusValidator:[
    check('status').isBoolean()
  ],bookSlotValidator:[
    check('time').trim().exists().notEmpty(),
    check('name').trim().exists().notEmpty(),
    check('cart').isObject(),
    check('shopId').isMongoId(),

  ],
  getSlotValidator:[
    check('shopId').isMongoId(),
  ]
};
