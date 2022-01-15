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
const { check } = require("express-validator");
const { existEmail } = require("../usecases/verifica.js");
const { subirArchivo } = require("../lib/subiendoArchivos");
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
  // verifiedAge,
  // pswDefinition,
  // isMember,
  // defphonePersonal,
  // [check("email").custom(existEmail), validarCampos],
  // [check("email", "el correo no es valido").isEmail(), validarCampos],
  async (request, response, next) => {
    try {
      const clientData = request.body;
      const { Role } = clientData;
      if (Role === "cliente") {
        if (request.file.filename) {
          request.body.picture = request.file.filename;
        }
      }
      const rols = await rol.find("tatuador");
      const { _id } = rols;
      userData = { ...userData, idRole: _id.toString() };
      const clientCreated = await client.create(clientData);
      response.status(201).json({
        status: true,
        message: "New user created",
        payload: {
          clientCreated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/:idClient", isMember, async (request, response, next) => {
  const { idClient } = request.params;
  const clientData = request.body;
  const clientId = clientData._id;

  if (idClient === clientId) {
    try {
      const clientUpdate = await client.update(idClient, clientData);
      response.status(201).json({
        ok: true,
        message: `Updated`,
        clientUpdate,
      });
    } catch (error) {
      next(error);
      response.status(404).json({
        status: false,
        message: "Client not found",
      });
    }
  } else {
    response.status(404).json({
      ok: false,
      message: "Can´t updated",
    });
  }
});
//eliminar
router.delete("/:idClient", isAdmin, (request, response, next) => {
  try {
    const { idClient } = request.params;
    const clientId = client.del(idClient);
    response.status(202).json({
      ok: true,
      message: `Deleted  ${idClient} successfully`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
