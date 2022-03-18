var express = require("express");
var router = express.Router();
const {
  addMediValidator,
  editMediValidator,
  idValidator,
  suggestionValidator,
  bookSlotValidator,
  getSlotValidator,
} = require("../middleware/validator");
const { checkValidator, auth, isShopkeeper } = require("../middleware/auth");
const {
  addMedi,
  editMedi,
  deleteMedi,
  getMedibyName,
  getSksMedi,
  getSuggestion,
  bookSlot,
  viewAllSlots,
  getSlots,
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

router.post("/get-slot", auth, getSlotValidator, checkValidator, getSlots);

router.post("/book-slot", auth, bookSlotValidator, checkValidator, bookSlot);

router.get("/view-slot/:time", auth, isShopkeeper, viewAllSlots);

module.exports = router;
