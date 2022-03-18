var express = require("express");

const {
  getShopkeepers,
  deleteUser,
  approveSk,
  getDetails,
  editProfile,
} = require("../controllers/users");
var router = express.Router();
const {
  auth,
  isAdmin,
  checkValidator,
  isShopkeeper,
} = require("../middleware/auth");
const {
  statusValidator,
  idValidator,
  editValidator,
} = require("../middleware/validator");

router.post(
  "/get",
  auth,
  isAdmin,
  statusValidator,
  checkValidator,
  getShopkeepers
);

router.post("/delete", auth, isAdmin, idValidator, checkValidator, deleteUser);

router.post("/approve", auth, isAdmin, idValidator, checkValidator, approveSk);

router.get("/get/:id", auth, isShopkeeper, getDetails);

router.post(
  "/edit",
  auth,
  isShopkeeper,
  editValidator,
  checkValidator,
  editProfile
);
module.exports = router;
