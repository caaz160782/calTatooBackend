const express = require("express");
const router = express.Router();
const dateReservation = require("../usecases/dateReservationTatoo");
const { isAdmin } = require("../middlewares/authHandlers");

router.get("/:idStudio", isAdmin, async (request, response, next) => {
  const { idStudio } = request.params;
  try {
    const dates = await dateReservation.getByIdStudio(idStudio);
    response.status(201).json({
      code: true,
      message: "Encontrada citas",
      payload: { dates },
    });
  } catch (error) {
    //next(error)
    response.status(404).json({
      code: false,
      message: "Ninguna Cita Encontrada",
      error: error,
    });
  }
});

module.exports = router;
