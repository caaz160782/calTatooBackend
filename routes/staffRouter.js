const express = require("express");
const router = express.Router();
const user = require("../usecases/staffs");
const rol = require("../usecases/rols");
const {
  pswDefinition,
  defPhoneNumber,
  defphonePersonal,
  emailVerifiqued,
  defCurp,
  defRfc,
} = require("../middlewares/typesVerified");
const {
  isAdmin,
  validarCampos,
  correoExiste,
} = require("../middlewares/authHandlers");
const { subirArchivo } = require("../lib/subiendoArchivos");

router.post(
  "/",
  subirArchivo,
  isAdmin,
  correoExiste,
  //emailVerifiqued,
  pswDefinition,
  defPhoneNumber,
  defphonePersonal,
  defCurp,
  defRfc,
  async (request, response, next) => {
    //console.log(request.body);
    try {
      let userData = request.body;
      const { Role, picture } = request.body;
      if (Role === "staffTatuador") {
        if (picture !== "") {
          if (request.file.filename) {
            request.body.picture = request.file.filename;
          }
        }
        const rols = await rol.find("tatuador");
        const { _id } = rols;
        userData = { ...userData, idRole: _id.toString() };
        const userCreated = await user.create(userData, response);
        response.status(201).json({
          status: "ok",
          message: "Created successfully",
          payload: {
            userCreated,
          },
        });
      }
    } catch (error) {
      //  next(error);
      response.status(404).json({
        status: "wrong",
        message: "sttaf not created",
        error: "tatuador no creado",
      });
    }
  }
);

router.get("/", isAdmin, async (request, response, next) => {
  //router.get("/", async (request, response, next) => {
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

//router.get("/:idUser", isAdmin, async (request, response, next) => {
router.get("/:idUser", async (request, response, next) => {
  const { idUser } = request.params;
  //console.log(idUser);
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
      message: `Deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:idUser",
  subirArchivo,
  isAdmin,
  defCurp,
  defRfc,
  async (request, response, next) => {
    const { idUser } = request.params;
    const userData = request.body;
    const { picture } = userData;
    try {
      if (picture !== "") {
        if (request.file.filename) {
          request.body.picture = request.file.filename;
        }
      }
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
  }
);

module.exports = router;
