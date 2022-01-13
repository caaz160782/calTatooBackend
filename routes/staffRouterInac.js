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
const User = require("../models/users").model;
const { load } = require("dotenv");

//router.patch("/:idUser", isAdmin, subirArchivo, async (req, response, next) => {
router.patch("/:idUser", isAdmin, async (req, response, next) => {
  const { idUser } = req.params;
  try {
    const userReactivado = await User.findByIdAndUpdate(idUser, {
      statusUser: true,
    }).exec();

    response.status(201).json({
      ok: true,
      message: `Actualizado`,
      userReactivado,
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
