const express = require("express");
const router = express.Router();
const studioTat = require("../usecases/Studio");


// router.post("/", isAdmin,async (request, response, next) => {
  router.post("/",async (request, response, next) => {
  try {
    const studioData = request.body;
    console.log(studioData);
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

// router.get("/:idStudio",isAdmin, async (request, response, next) => {
  router.get("/:idStudio", async (request, response, next) => {
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


// router.patch("/:idStudio",isAdmin, async (request, response, next) => {
router.patch("/:idStudio", async (request, response, next) => {
    const { idStudio } = request.params;
    const studioData = request.body;
    try {
        const studioUpdate = await studioTat.update(idStudio, studioData);
        response.status(201).json({
           ok: true,
           message: "Created successfully",
           payload:  studioCreated,
       })
      }
       catch (error){
        next(error)
      } 
})