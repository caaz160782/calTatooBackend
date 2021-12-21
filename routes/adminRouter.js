const express = require("express");
const router = express.Router();
const user = require("../usecases/admin");
const { validarCampos } = require("../middlewares/authHandlers");
const { check } = require("express-validator");
const { existEmail } = require("../usecases/verifica.js");
const {
  nameNull,
  pswDefinition,
  idNull,
  emailVerifiqued,
} = require("../middlewares/typesVerified");

router.post(
  "/",
  idNull,
  nameNull,
  pswDefinition,
  emailVerifiqued,
  [check("email").custom(existEmail), validarCampos],
  async (req, res, next) => {
    try {
      const userData = req.body;
      const adminCreated = await user.create(userData);
      res.status(201).json({
        status: "ok",
        message: "Created succsessfully",
        payload: {
          adminCreated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
