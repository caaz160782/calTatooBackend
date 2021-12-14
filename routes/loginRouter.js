const express = require("express");
const router = express.Router();
const login = require("../usecases/login");
const { validarCampos } = require("../middlewares/authHandlers");
const { check } = require("express-validator");

router.post(
  "/",
  [check("email", "el correo no es valido").isEmail(), validarCampos],
  async (req, res, next) => {
    try {
      const userAccess = req.body;
      const resFind = await login.find(userAccess);
      const { message, token } = resFind;
      if (message === 1) {
        res.status(202).json({
          status: "ingreso correcto",
          token: token,
        });
      } else if (message === 2) {
        res.status(404).json({
          status: "404-2",
        });
      } else if (message === 3) {
        res.status(404).json({
          status: "404-3",
          message: "email no registrado",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
