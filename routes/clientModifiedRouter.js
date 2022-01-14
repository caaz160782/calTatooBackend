const express = require("express");
const router = express.Router();
const client = require("../usecases/client");
const { isClient } = require("../middlewares/authHandlers");

//modificacion por el cliente
router.patch("/:idClient", isClient, async (request, response, next) => {
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

module.exports = router;
