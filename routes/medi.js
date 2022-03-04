var express = require("express");
var router = express.Router();
const {
  addMediValidator,
  editMediValidator,
  idValidator,
  suggestionValidator,
} = require("../middleware/validator");
const { checkValidator, auth, isShopkeeper } = require("../middleware/auth");
const {
  addMedi,
  editMedi,
  deleteMedi,
  getMedibyName,
  getSksMedi,
  getSuggestion,
} = require("../controllers/medi");

router.post(
  "/add",
  auth,
  isShopkeeper,
  addMediValidator,
  checkValidator,
  addMedi
);

router.post(
  "/edit",
  auth,
  isShopkeeper,
  editMediValidator,
  checkValidator,
  editMedi
);

router.post(
  "/delete",
  auth,
  isShopkeeper,
  idValidator,
  checkValidator,
  deleteMedi
);

router.post(
  "/all-name",
  auth,
  suggestionValidator,
  checkValidator,
  getMedibyName
);

router.get("/get-sks", auth, isShopkeeper, getSksMedi);

router.post(
  "/suggestion",
  auth,
  suggestionValidator,
  checkValidator,
  getSuggestion
);

module.exports = router;
