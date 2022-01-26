const express = require("express");
const router = express.Router();
const dateReservation = require("../usecases/dateReservationTatoo");
const { isRegister } = require("../middlewares/authHandlers");

router.post("/:idStudio", isRegister, async (request, response, next) => {
  const { idStudio } = request.params;
  const { idStaff } = request.body;

  try {
    const dates = await dateReservation.getByIdStudioStaff(idStudio, idStaff);
    response.status(201).json({
      code: true,
      message: "Encontrada citas",
      payload: { dates },
    });
  } catch (error) {
    //next(error)
    response.status(404).json({
      code: false,
      message: "Ninguna Cita Encontrada staff",
      error: error,
    });
  }
});
module.exports = router;
