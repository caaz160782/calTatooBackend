const express = require("express");
const router = express.Router();
const user = require("../usecases/staffs");


//crea a todos
router.post(
  "/",
  async (request, response, next) => {
   // console.log(user.create);
    try {
     // const userData = request.body;
      const userCreated = await user.create(request.body);
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

router.get("/", async (request, response, next) => {
  try {
    const users = await user.get();
    response.json({
      ok: true,
      message: "Done",
      listUser: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
