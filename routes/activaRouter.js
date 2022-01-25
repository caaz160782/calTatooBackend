const express = require("express");
const router = express.Router();
const activa = require("../usecases/activacion");
const {
  differenceInMilliseconds,
  //differenceInMinutes,
  parseISO,
} = require("date-fns");

router.post("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { diaHoy } = req.body;
    const infoHash = await activa.get(id);
    const result = differenceInMilliseconds(
      parseISO(diaHoy),
      infoHash.addedDate
    );
    //console.log(result);
    if (result <= 432000000) {
      //console.log(1);
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

module.exports = router;
