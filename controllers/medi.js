const Medi = require("../models/medi");
const Slot = require("../models/timeSlot");

exports.addMedi = async (req, res) => {
  try {
    const { companyName, name, dose, stock, price } = req.body;
    const { userId, shopName } = req;
    await Medi.create({
      name,
      companyName,
      dose,
      stock,
      shopId: userId,
      shopName,
      price,
    });
    res.json({ status: true });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.editMedi = async (req, res) => {
  try {
    const { _id, companyName, name, dose, stock, price } = req.body;
    const { userId, shopName } = req;
    if (
      (
        await Medi.updateOne(
          { _id, shopId: userId },
          { companyName, name, dose, stock, price }
        )
      ).modifiedCount === 1
    )
      res.json({ status: true });
    else res.json({ status: false, message: "Failed to update" });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.deleteMedi = async (req, res) => {
  try {
    const { _id } = req.body;
    const { userId } = req;
    if ((await Medi.deleteOne({ _id, shopId: userId })).deletedCount === 1)
      res.json({ status: true });
    else res.json({ status: false, message: "Failed to delete" });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.getMedibyName = async (req, res) => {
  try {
    const { data } = req.body;
    const medis = await Medi.find({ name: { $regex: data, $options: "$i" } });
    res.json({ status: true, medis });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.getSksMedi = async (req, res) => {
  try {
    const { userId } = req;
    const medis = await Medi.find({ shopId: userId });
    res.json({ status: true, medis });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.getSuggestion = async (req, res) => {
  try {
    const { data } = req.body;
    const suggestions = await Medi.find({
      name: { $regex: data, $options: "$i" },
    }).select("name");
    res.json({ status: true, suggestions });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.viewAllSlots = async (req, res) => {
  try {
    const { userId } = req;
    const {time} = req.params
    const slots = await Slot.find({
      shopId: userId,
      day: new Date().toLocaleDateString(),
      time
    });
    res.json({ status: true, slots });
  } catch (error) {
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.bookSlot = async (req, res) => {
  try {
    const { shopId, cart, time, name } = req.body;
    const { userId } = req;
    const currentTime = new Date().getHours();
    const bookingTime =
      parseInt(time) < 9 ? parseInt(time) + 12 : parseInt(time);
    if (bookingTime - currentTime < 1) {
      res.json({ status: false, message: "change time" });
    } else {
      const allSlot = (
        await Slot.find({ shopId, day: new Date().toLocaleDateString(), time })
      ).length;
      const alreadyBooked = await Slot.findOne({
        shopId,
        day: new Date().toLocaleDateString(),
        time,
        userId,
      });

      if (allSlot == 10) {
        res.json({ status: false, message: "slot filled" });
      } else {
        if (alreadyBooked) {
          if (
            (
              await Slot.updateOne(
                { shopId, day: new Date().toLocaleDateString(), userId, time },
                { $push: { cart } }
              )
            ).modifiedCount == 1
          )
            res.json({ status: true, message: "slot booked" });
        } else {
          await Slot.create({ shopId, cart: [cart], time, userId, name });
          res.json({ status: true, message: "slot booked" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "something went wrong" });
  }
};

exports.getSlots = async (req, res) => {
  try {
    const { shopId } = req.body;
    const slots = await Slot.find({
      shopId,
      day: new Date().toLocaleDateString(),
    });
    let slotStatus = {};

    for (let i = 0; i <= 12; i++) {
      slotStatus[i] = slots.filter((s) => s.time == i).length;
    }
       res.json({status:true,slots,slotStatus})

  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};
