const express = require("express");
const router = express.Router();
const user = require("../usecases/admin");
const rol = require("../usecases/rols");
const { validarCampos } = require("../middlewares/authHandlers");
const { check } = require("express-validator");
const { existEmail } = require("../usecases/verifica.js");
const {
  nameNull,
  lastNameNull,
  pswDefinition,
  idNull,
  emailVerifiqued,
} = require("../middlewares/typesVerified");

router.post(
  "/",
  nameNull,
  lastNameNull,
  pswDefinition,
  emailVerifiqued,
  [check("email").custom(existEmail), validarCampos],
  async (req, res, next) => {
    try {
      let userData = req.body;
      const { register } = req.body;
      if (register) {
        const rols = await rol.find("Administrador");
        const { _id } = rols;
        userData = { ...userData, idRole: _id.toString() };
        const adminCreated = await user.create(userData);
        res.status(201).json({
          status: true,
          message: "Created succsessfully",
          payload: adminCreated,
        });
      } else {
        res.status(400).json({
          status: "false",
          message: "No it possible create the user",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
