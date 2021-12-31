const express = require("express");
const router = express.Router();
const rol = require("../usecases/sizes");

router.get("/", async (request, response, next) => {
  try {
    const size = await size.get();
    response.json({
      ok: true,
      message: "Done",
      payload: size,
    });
  } catch (error) {
    //next(error);
    console.log(error)
  }
});

module.exports = router;
