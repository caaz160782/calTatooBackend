const express = require("express");
const router = express.Router();
const client = require("../usecases/client");
const {
  isAdmin,
  isMember,
  validarCampos,
} = require("../middlewares/authHandlers");
const {
  verifiedAge,
  pswDefinition,
  defphonePersonal,
} = require("../middlewares/typesVerified");
const rol = require("../usecases/rols");
const { subirArchivo } = require("../lib/subiendoArchivos");
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

//cliente por id
router.get("/:idClient", isMember, async (request, response, next) => {
  const { idClient } = request.params;
  try {
    const clientId = await client.getById(idClient);
    response.json({
      ok: true,
      message: "Done",
      listClient: { clientId },
    });
  } catch (error) {
    response.status(404).json({
      ok: false,
      message: "Client not found",
    });
  }
});
//lista clientes
router.get("/", isMember, async (request, response, next) => {
  try {
    const clients = await client.get();
    response.json({
      ok: true,
      message: "Done",
      listClient: {
        clients,
      },
    });
  } catch (error) {
    next(error);
  }
});
//crea a los clientes
router.post(
  "/",
  subirArchivo,
  verifiedAge,
  isMember,
  defphonePersonal,
  async (request, response, next) => {
    try {
      let clientData = request.body;
      //console.log("cleint data", clientData);
      const { Role, picture } = request.body;
      if (Role === "Cliente") {
        if (picture !== "") {
          if (request.file.filename) {
            request.body.picture = request.file.filename;
          }
        }
        const rols = await rol.find("Cliente");
        const { _id } = rols;
        clientData = { ...clientData, idRole: _id.toString() };
        const clientCreated = await client.create(clientData);
        const sendAct = await activa.create(clientCreated._id);
        const liga = serverSend + "/cuenta/" + sendAct.hash;
        sendEmail(clientCreated.email, `Crea tu password`, liga);
        response.status(201).json({
          status: true,
          message: "New user created",
          payload: {
            clientCreated,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:idClient",
  subirArchivo,
  isMember,
  async (request, response, next) => {
    const { idClient } = request.params;
    const { picture } = request.body;
    const clientId = clientData._id;
    try {
      if (picture !== "") {
        if (request.file.filename) {
          request.body.picture = request.file.filename;
        }
      }
      const clientUpdate = await client.update(idClient, request.body);
      response.status(201).json({
        ok: true,
        message: `modificado por el administrador`,
        clientUpdate,
      });
    } catch (error) {
      //next(error);
      response.status(404).json({
        status: false,
        message: "Client not found",
      });
    }
  }
);
//eliminar
router.delete("/:idClient", isAdmin, (request, response, next) => {
  try {
    const { idClient } = request.params;
    const clientId = client.remove(idClient);
    response.status(202).json({
      ok: true,
      message: `Dado de baja correctamente`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
