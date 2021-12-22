const express = require("express");
const router = express.Router();
const client = require("../usecases/client");
const {isAdmin, isStaff, validarCampos} = require("../middlewares/authHandlers");
const { verifiedAge, pswDefinition, defPhoneNumber } = require("../middlewares/typesVerified");
const { check } = require("express-validator");
const { existEmail } = require("../usecases/verifica.js");

//cliente por id
router.get("/:idClient", isAdmin, isStaff, async (request, response, next) => {
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
router.get("/", async (request, response, next) => {
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
  verifiedAge,
  pswDefinition,
  isAdmin,
  defPhoneNumber,  
  [check("email").custom(existEmail), validarCampos],
  [check("email", "el correo no es valido").isEmail(), validarCampos],
  async (request, response, next) => {
    try {
      const clientData = request.body;
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

router.patch("/:idClient", isAdmin, async (request, response, next) => {
  console.log(`request`, request);
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
