const express = require("express");
const router = express.Router();
const remClient = require("../usecases/rememberClient");

router.get("/", async (req, res, next) => {
  try {
    const rememClient = await remClient.get();
    res.json({
      message: "Done",
      payload: rememClient,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
