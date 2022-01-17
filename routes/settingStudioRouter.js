const { response } = require("express");
const express = require("express");
const router = express.Router();
const settingStudio = require("../usecases/setting");
const admin = require("../usecases/admin");
const { isAdmin } = require("../middlewares/authHandlers");
const { subirArchivo } = require("../lib/subiendoArchivos");

router.post("/", subirArchivo, isAdmin, async (req, res, next) => {
  try {
    let settingData = req.body;
    if (req.body.picture !== "") {
      if (req.file.filename) {
        settingData = { ...settingData, logo: req.file.filename };
      }
    }
    const id_user = req.id;
    const settingCreated = await settingStudio.create(settingData);
    const upFinConfigStudio = await admin.updateFinConfig(
      id_user,
      (finishConfig = true)
    );
    res.status(201).json({
      status: "ok",
      message: "Created succsesfully",
      payload: {
        settingCreated,
      },
    });
  } catch (error) {
    res.status(400).json({
      code: "Unable to create setting",
      status: "false",
      message: error,
    });
    next(error);
  }
});

router.get("/:idSetting", isAdmin, async (req, res, next) => {
  const { idSetting } = req.params;
  try {
    const settingsStudio = await settingStudio.getByStudio(idSetting);
    res.json({
      code: "Done",
      message: "Done",
      payload: settingsStudio,
    });
  } catch (error) {
    res.status(404).json({
      code: "NOT FOUND SETTING",
      message: "Setting not found",
      error: error,
    });
  }
});

router.patch("/:idSetting", subirArchivo, isAdmin, async (req, res, next) => {
  const { idSetting } = req.params;
  let settingData = req.body;
  if (req.body.picture !== "") {
    if (req.file.filename) {
      settingData = { ...settingData, logo: req.file.filename };
    }
  }
  try {
    const settingUpdate = await settingStudio.update(idSetting, settingData);
    res.status(201).json({
      status: "true",
      message: "Updated",
      payload: settingUpdate,
    });
  } catch (error) {
    next(error);
    res.status(404).json({
      status: false,
      message: "studio not found",
      error: error,
    });
  }
});

module.exports = router;
