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
  //console.log(idStudio);
  try {
    const dates = await dateReservation.getByIdStudio(idStudio);
    response.status(201).json({
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

router.delete("/:idDate", (request, response, next) => {
  try {
    const { idDate } = request.params;
    const resDelete = dateReservation.deleteDate(idDate);
    response.status(202).json({
      ok: true,
      res: resDelete,
      message: `Deleted  successfully`,
    });
  } catch (error) {
    next(error);
    response.status(404).json({
      code: false,
      res: resDelete,
      message: "Can't delete",
      error: "error",
    });
  }
});

module.exports = router;