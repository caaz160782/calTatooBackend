const express = require("express");
const router = express.Router();
const user = require("../usecases/admin");

router.post("/", async (request, response, next) => {
  try {
    const userData = request.body;
    const adminCreated = await user.create(userData);
    response.status(201).json({
      status: "ok",
      message: "Created succsessfully",
      payload: {
        adminCreated,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
});

module.exports = router;
