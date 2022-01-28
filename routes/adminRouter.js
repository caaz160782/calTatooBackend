const express = require("express");
const router = express.Router();
const user = require("../usecases/admin");
const rol = require("../usecases/rols");
const { correoExiste } = require("../middlewares/authHandlers");
const config = require("../lib/config");
const sgMail = require("@sendgrid/mail");
const keyGrid = config.sendgrid.api_key;
const activa = require("../usecases/activacion");
const serverSend = config.server.serverH;
const {
  nameNull,
  lastNameNull,
  pswDefinition,
  idNull,
  emailVerifiqued,
} = require("../middlewares/typesVerified");

const sendEmail = (to, subject, text) => {
  sgMail.setApiKey(keyGrid);
  const msg = {
    to: to, // Change to your recipient
    from: "admin@perfecttimeink.info ", // Change to your verified sender
    subject: subject, //subject: 'Sending with SendGrid is Fun',
    html: `<strong>${text}</strong>`,
    // html: `Bienvenido Has sido registrado correctamente en Perfect Time Ink`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
  return sgMail;
};

router.post(
  "/",
  nameNull,
  lastNameNull,
  pswDefinition,
  emailVerifiqued,
  correoExiste,
  async (req, res, next) => {
    let userData = req.body;
    try {
      let userData = req.body;
      const { register } = req.body;
      if (register) {
        const rols = await rol.find("Administrador");
        const { _id } = rols;
        userData = { ...userData, idRole: _id.toString() };
        const adminCreated = await user.create(userData);
        sendEmail(
          adminCreated.email,
          `Registro Existoso`,
          "!Felicidades bienvenido a Perfect Time Ink. ¡"
        );
        res.status(201).json({
          status: true,
          message: "Created succsessfully",
          payload: adminCreated,
        });
      } else {
        res.status(400).json({
          code: "Unable to create user",
          status: "false",
          message: "Unable to create user",
        });
      }
    } catch (error) {
      res.status(400).json({
        code: "Unable to create user",
        status: "false",
        message: "error",
      });
      next(error);
    }
  }
);
module.exports = router;
