const express = require("express");
const router = express.Router();
const studioTat = require("../usecases/Studio");
const { isAdmin} = require("../middlewares/authHandlers");


router.post("/", isAdmin,async (request, response, next) => {
  try {
    const studioData = request.body;
    const studioCreated = await studioTat.create(studioData);
    response.status(201).json({
      ok: true,
      message: "Created successfully",
      payload: studioCreated,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:idStudio",isAdmin, async (request, response, next) => {
    const { idStudio } = request.params;
    try {
      const studioFound = await studioTat.getById(idStudio);
      response.json({
        ok: true,
        message: "Done",
        listUser: { studioFound },
      });
    } catch (error) {
      response.status(404).json({
        ok: false,
        message: "Studio not found",
      });
    }
  });


router.patch("/:idStudio",isAdmin, async (request, response, next) => {
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
