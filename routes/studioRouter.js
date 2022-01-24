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

router.post(
  "/",
  subirArchivo,
  isAdmin,
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
  async (req, res, next) => {
    try {
      let studioData = req.body;
      if (req.body.picture !== "") {
        if (req.file.filename) {
          studioData = { ...studioData, picture: req.file.filename };
        }
      }
      const id_user = req.id;
      //const studioData = request.body;
      //const id_user = request.id;
      const studioCreated = await studioTat.create(studioData, id_user);
      const upUsRegStudio = await admin.updateRegStudio(
        id_user,
        (registerStudio = true)
      );
      res.status(201).json({
        code: true,
        message: "Creado correctamente",
        payload: studioCreated,
      });
    } catch (error) {
      next(error);
      res.status(401).json({
        code: false,
        message: "No se pudo crear el estudio",
        error: error,
      });
    }
  }
);

router.get("/:idStudio", isAdmin, async (request, response, next) => {
  const { idStudio } = request.params;
  //console.log(idStudio);
  try {
    const studioFound = await studioTat.getById(idStudio);
    response.json({
      ok: true,
      message: "Done",
      payload: studioFound,
    });
  } catch (error) {
    response.status(404).json({
      ok: false,
      message: "Studio not encontrado",
      error: "error",
    });
  }
});

router.patch(
  "/:idStudio",
  subirArchivo,
  isAdmin,
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
  async (req, res, next) => {
    try {
      let studioData = req.body;
      if (req.body.picture !== "") {
        if (req.file.filename) {
          studioData = { ...studioData, picture: req.file.filename };
        }
      }
      const { idStudio } = req.params;
      const studioUpdate = await studioTat.update(idStudio, studioData);
      res.status(201).json({
        ok: true,
        message: `Actualizado`,
        studioUpdate,
      });
    } catch (error) {
      next(error);
      res.status(404).json({
        status: false,
        message: "studio not found",
      });
    }
  }
);

module.exports = router;
