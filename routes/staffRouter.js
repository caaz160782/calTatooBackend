const express = require("express");
const router = express.Router();
const user = require("../usecases/staffs");
const  {isAdmin} = require("../middlewares/authHandlers");


router.post(
  "/",isAdmin,
  async (request, response, next) => {
    try {
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

router.get("/:idUser", async (request, response, next) => {
  const { idUser } = request.params;
  try {
    const userFound = await user.getById(idUser);
    response.json({
      ok: true,
      message: "Done",
      listUser: { userFound },
    });
  } catch (error) {
    response.status(404).json({
      ok: false,
      message: "User not found",
    });
  }
});

router.delete("/:idUser", (request, response, next) => {
  try {
    const { idUser } = request.params;
    const userId = user.remove(idUser);
    response.status(202).json({
      ok: true,
      message: `Deleted  ${idUser} successfully`,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:idUser", async (request, response, next) => {
  const { idUser } = request.params;
  console.log(idUser);
 // const userId = request.id;
  const userData = request.body;

    try {
      const userUpdate = await user.update(idUser, userData);
      response.status(201).json({
        ok: true,
        message: `Actualizado`,
        userUpdate,
      });
    } catch (error) {
      next(error);
      response.status(404).json({
        status: false,
        message: "User not found",
      });
    }

});

module.exports = router;
