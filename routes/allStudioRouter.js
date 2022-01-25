const express = require("express");
const router = express.Router();
const studioTat = require("../usecases/Studio");
const admin = require("../usecases/admin");
const { isAdmin } = require("../middlewares/authHandlers");
const {
  idNull,
  nameNull,
  descriptionNull,
  cpNull,
  municipioNull,
  estadoNull,
  cityNull,
  dirNull,
  defPhoneStudio,
  defWhatsapp,
  defRfc,
} = require("../middlewares/studioVerifief");
const { subirArchivo } = require("../lib/subiendoArchivos");

router.get("/", async (request, response, next) => {
  try {
    const studioFound = await studioTat.getAll();
    response.json({
      ok: true,
      message: "Done",
      listUser: { studioFound },
      // studioFound,
    });
  } catch (error) {
    response.status(404).json({
      ok: false,
      message: "Studio not found",
    });
  }
});

router.patch("/:idStudio", isAdmin, async (request, response, next) => {
  const { idStudio } = request.params;
  const studioData = request.body;
  try {
    const studioUpdate = await studioTat.update(idStudio, studioData);
    response.status(201).json({
      ok: true,
      message: `Actualizado`,
      studioUpdate,
    });
  } catch (error) {
    next(error);
    response.status(404).json({
      status: false,
      message: "studio not found",
    });
  }
});

module.exports = router;
