const express = require("express");
const router = express.Router();
const rol = require("../usecases/rols");

router.get("/", async (request, response, next) => {
  try {
    const rols = await rol.get();
    response.json({
      ok: true,
      message: "Done",
      payload: rols,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
