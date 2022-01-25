const express = require("express");
const router = express.Router();
const dateReservation = require("../usecases/dateReservationTatoo");
const { isAdmin } = require("../middlewares/authHandlers");
const { subirArchivo } = require("../lib/subiendoArchivos");

//router.post("/", subirArchivo, isAdmin, async (req, res, next) => {
router.post("/", subirArchivo, async (req, res, next) => {
  console.log("cita-------", req.body);
  try {
    let dateTatooData = req.body;
    if (req.body.picture !== "") {
      if (req.file.filename) {
        dateTatooData = { ...dateTatooData, desPhotoTatoo: req.file.filename };
      }
    }
    //console.log(dateTatooData);
    const createdDate = await dateReservation.create(dateTatooData);
    res.status(201).json({
      code: "Created",
      message: "Cita Creada correctamente",
      payload: createdDate,
    });
  } catch (error) {
    next(error);
    res.status(404).json({
      code: false,
      message: "No fue posible crear la cita",
      error: error,
    });
  }
});

router.get("/:idDate", async (request, response, next) => {
  const { idDate } = request.params;
  try {
    const dates = await dateReservation.getById(idDate);
    response.status(201).json({
      code: true,
      message: "Done",
      payload: dates,
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

router.patch("/:idDate", isAdmin, async (req, res, next) => {
  try {
    const { idDate } = req.params;
    const dateTatooData = req.body;
    const dateUpdate = await dateReservation.update(idDate, dateTatooData);
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

router.delete("/:idDate", isAdmin, (request, response, next) => {
  try {
    const { idDate } = request.params;
    const resDelete = dateReservation.deleteDate(idDate);
    response.status(202).json({
      ok: true,
      res: resDelete,
      message: `borrado correctamente`,
    });
  } catch (error) {
    next(error);
    response.status(404).json({
      code: false,
      res: resDelete,
      message: "no se puede borrar",
      error: "error",
    });
  }
});

module.exports = router;
