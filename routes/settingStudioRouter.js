const { response } = require("express");
const express = require("express");
const router = express.Router();
const settingStudio = require("../usecases/setting");
<<<<<<< HEAD
const admin = require("../usecases/admin");
=======
const user = require("../usecases/admin");
>>>>>>> develop
const { isAdmin } = require("../middlewares/authHandlers");

router.post("/", isAdmin, async (req, res, next) => {
  try {
    const settingData = req.body;
    const id_user = req.id;
    const settingCreated = await settingStudio.create(settingData);
<<<<<<< HEAD
    const upFinConfigStudio = await admin.updateFinConfig(
=======
    const upUsfinishConfig = await user.updateFinishConfig(
>>>>>>> develop
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
    next(error);
  }
});

router.get("/:idSetting", isAdmin, async (req, res, next) => {
  const { idSetting } = req.params;
  //console.log(1, idSetting);
  try {
    const settingsStudio = await settingStudio.getById(idSetting);
    res.json({
      message: "Done",
      payload: settingsStudio,
    });
  } catch (error) {
    res.status(404).json({
      code: "NOT FOUND SETTING",
      message: "Setting not found",
    });
  }
});

router.patch("/:idSetting", async (req, res, next) => {
  const { idSetting } = req.params;
  const settingData = req.body;
  try {
    const settingUpdate = await settingStudio.update(idSetting, settingData);
    res.status(201).json({
      message: "Updated",
      payload: settingUpdate,
    });
  } catch (error) {
    next(error);
    res.status(404).json({
      status: false,
      message: "studio not found",
    });
  }
});

module.exports = router;
