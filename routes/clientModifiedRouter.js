const express = require("express");
const router = express.Router();
const client = require("../usecases/client");
const { isClient } = require("../middlewares/authHandlers");
const { subirArchivo } = require("../lib/subiendoArchivos");

router.get("/:idClient", async (request, response, next) => {
  const { idClient } = request.params;
  console.log("si mismo");
  console.log("gettit a si mismos", idClient);
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

//modificacion por el cliente
router.patch(
  "/:idClient",
  subirArchivo,
  isClient,
  async (request, response, next) => {
    const { idClient } = request.params;
    //const clientData = request.body;
    const { picture } = request.body;
    const clientId = request.id;

    if (idClient === clientId) {
      console.log(`request`, idClient, clientId);
      try {
        if (picture !== "") {
          if (request.file.filename) {
            request.body.picture = request.file.filename;
          }
        }
        const clientUpdate = await client.update(idClient, request.body);
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
  }
);

module.exports = router;
