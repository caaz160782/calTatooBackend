const express = require("express");
const router = express.Router();
const dateReservation = require("../usecases/dateReservationTatoo");

router.post("/", async (req, res, next) => {
  try {
    const dateTatooData = req.body;
    const createdDate = await dateReservation.create(dateTatooData);
    res.status(201).json({
      code: "Succesful",
      message: " Created correctly",
      payload: createdDate,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:idStudio", async (request, response, next) => {
  const { idStudio } = request.params;
  try {
    const dates = await dateReservation.getByIdStudio(idStudio);
    response.json({
      code: true,
      message: "Done",
      payload: { dates },
    });
  } catch (error) {
    //next(error)
    response.status(404).json({
      code: false,
      message: "Dates not found",
    });
  }
});

module.exports = router;
