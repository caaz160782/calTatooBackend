const { response } = require("express");
const express = require("express");
const router = express.Router();
const settingStudio = require("../usecases/setting");
const { isAdmin } = require("../middlewares/authHandlers");

router.get("/:idStudio", async (req, res, next) => {
  const { idStudio } = req.params;
  try {
    const settingsStudio = await settingStudio.getByStudio(idStudio);
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

module.exports = router;
