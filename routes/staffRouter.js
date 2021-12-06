const express = require("express");
const router = express.Router();
const user = require("../usecases/staff/index");


//crea a todos
router.post(
  "/",
  async (request, response, next) => {
    try {
      const userData = request.body;
      const userCreated = await user.create(userData);
      response.status(201).json({
        status: "ok",
        message: "Created successfully",
        payload: {
          userCreated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);
//modificar usuario

module.exports = router;
