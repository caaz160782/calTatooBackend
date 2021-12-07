const express = require("express");
const router = express.Router();
const infoTatoo = require("../usecases/tatooInfo");

router.post("/", async (req, res, next) => {
  try {
    const infoTatooData = req.body;
    const dateCreated = await infoTatoo.create(infoTatooData);
    res.status(201).json({
      status: "ok",
      message: "date created",
      payload: {
        dateCreated,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
