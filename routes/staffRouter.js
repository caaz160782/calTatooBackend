const express = require("express");
const router = express.Router();
const user = require("../usecases/staffs");
const {
  pswDefinition,
  defPhoneNumber,
  defphonePersonal,
  defCurp,
  defRfc,
} = require("../middlewares/typesVerified");
const { isAdmin, validarCampos } = require("../middlewares/authHandlers");
const { check } = require("express-validator");
const { existEmail } = require("../usecases/verifica.js");
const { subirArchivo } = require("../lib/subiendoArchivos");

router.post(
  "/",
  isAdmin,
  [check("email").custom(existEmail), validarCampos],
  //[check("email", "el correo no es valido").isEmail(), validarCampos],
  pswDefinition,
  defPhoneNumber,
  defphonePersonal,
  defCurp,
  defRfc,
  subirArchivo,
  async (request, response, next) => {
    try {
      if (request.file.filename) {
        request.body.picture = request.file.filename;
      }
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

//router.get("/",isAdmin, async (request, response, next) => {
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

router.get("/:idUser", isAdmin, async (request, response, next) => {
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

router.delete("/:idUser", isAdmin, (request, response, next) => {
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

router.patch("/:idUser", isAdmin, async (request, response, next) => {
  const { idUser } = request.params;
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
