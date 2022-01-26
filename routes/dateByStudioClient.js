const express = require("express");
const router = express.Router();
const dateReservation = require("../usecases/dateReservationTatoo");
const { isRegister } = require("../middlewares/authHandlers");

router.post("/:idStudio", isRegister, async (request, response, next) => {
  const { idStudio } = request.params;
  const { idClient } = request.body;
  console.log(idClient);
  try {
    const dates = await dateReservation.getByIdStudioClient(idStudio, idClient);
    response.status(201).json({
      code: true,
      message: "Encontrada citas",
      payload: { dates },
    });
  } catch (error) {
    //next(error)
    response.status(404).json({
      code: false,
      message: "Ninguna Cita Encontrada Cliente",
      error: error,
    });
  }
});
module.exports = router;
