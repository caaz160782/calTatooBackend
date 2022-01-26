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
const rol = require("../usecases/rols");
const { subirArchivo } = require("../lib/subiendoArchivos");

//cliente por id
//router.get("/:idClient", isMember, async (request, response, next) => {
router.get("/:idClient", async (request, response, next) => {
  const { idClient } = request.params;
  console.log("gettit");
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
  //isMember,
  // defphonePersonal,
  // [check("email").custom(existEmail), validarCampos],
  //[check("email", "el correo no es valido").isEmail(), validarCampos],
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
        //console.log("cleinte creADO", clientCreated);
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
    // const clientId = clientData._id;

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
