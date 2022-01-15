const { response } = require("express");
const express = require("express");
const router = express.Router();
const client = require("../usecases/client");
const { isAdmin } = require("../middlewares/authHandlers");

router.get("/:idStudio", async (req, res, next) => {
  const { idStudio } = req.params;
  console.log(idStudio);
  try {
    const settingsStudio = await client.getByStudio(idStudio);
    console.log("resultado", settingsStudio);
    res.json({
      message: "Done",
      payload: settingsStudio,
    });
  } catch (error) {
    res.status(404).json({
      code: "NOT FOUND Staff",
      message: "Setting not found",
    });
  }
});

module.exports = router;
