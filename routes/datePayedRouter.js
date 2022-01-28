const express = require("express");
const router = express.Router();
const dateReservation = require("../usecases/dateReservationTatoo");
const { isAdmin } = require("../middlewares/authHandlers");
const { subirArchivo } = require("../lib/subiendoArchivos");

router.patch("/:idDate", async (req, res, next) => {
  const { idDate } = req.params;
  try {
    // const dateTatooData = req.body;
    const dateUpdate = await dateReservation.updatePayment(idDate);
    res.status(201).json({
      code: true,
      message: "Updated",
      payload: dateUpdate,
    });
  } catch (error) {
    next(error);
    res.status(404).json({
      code: false,
      message: "cita no encontrada",
      error: error,
    });
  }
});
module.exports = router;
