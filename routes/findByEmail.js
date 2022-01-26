const express = require("express");
const router = express.Router();
const client = require("../usecases/client");
const config = require("../lib/config");
const sgMail = require("@sendgrid/mail");
const keyGrid = config.sendgrid.api_key;
const activa = require("../usecases/activacion");
const serverSend = config.server.serverH;

const sendEmail = (to, subject, text) => {
  sgMail.setApiKey(keyGrid);
  const msg = {
    to: to, // Change to your recipient
    from: "admin@perfecttimeink.info ", // Change to your verified sender
    subject: subject, //subject: 'Sending with SendGrid is Fun',
    html: `Por favor da click en el siguiente enlace <strong> <a href=${text}> ${text} </a></strong> para que puedas agendar tus citas mas adelante`,
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

router.post("/", async (req, res, next) => {
  try {
    const email = req.body;
    const resFind = await client.getByEmail(email);
    const sendAct = await activa.create(resFind._id);
    const liga = serverSend + "/cuenta/" + sendAct.hash;
    sendEmail(resFind.email, `Crea un nuevo password`, liga);
    res.status(201).json({
      code: true,
      message: "send Email",
      //payload: resFind,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      code: false,
      message: "usuario no encontrado",
      error: "no existe el email",
    });
  }
});

module.exports = router;
