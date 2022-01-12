const express = require("express");
const router = express.Router();
const size = require("../usecases/sizes");

router.get("/", async (request, response, next) => {
  try {
    const sizes = await size.get();
    response.json({
      ok: true,
      message: "Done",
      payload: sizes,
    });
  } catch (error) {
    //next(error);
    console.log(error);
  }
});

module.exports = router;
