const express = require("express");
const router = express.Router();
const activa = require("../usecases/activacion");
const upPsw = require("../usecases/client");
const { differenceInMilliseconds, parseISO } = require("date-fns");

router.post("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { diaHoy } = req.body;
    const infoHash = await activa.get(id);
    //console.log(infoHash);
    const result = differenceInMilliseconds(
      parseISO(diaHoy),
      infoHash.addedDate
    );
    if (result <= 432000000) {
      res.status(202).json({
        code: true,
        message: "has disponible",
        payload: infoHash,
      });
    } else {
      const deleteHash = activa.deleteHash(infoHash._id);
      res.status(400).json({
        code: false,
        message: "La liga ha caducado",
        error: "La liga a caducado",
      });
    }
  } catch (error) {
    res.status(404).json({
      code: false,
      message: "la liga ya no se encuentra disponible",
      error: "loga no disponible",
    });
  }
});

router.patch("/:idUser", async (request, response, next) => {
  const { idUser } = request.params;
  const infoData = request.body;
  try {
    const upPswOk = await upPsw.updatePassword(idUser, infoData);
    const deleteHash = activa.deleteHash(infoData.idHash);
    response.status(201).json({
      code: true,
      message: `Actualizado`,
      payload: upPswOk,
    });
  } catch (error) {
    next(error);
    response.status(404).json({
      code: false,
      message: "User not found",
      error: error,
    });
  }
});

module.exports = router;
