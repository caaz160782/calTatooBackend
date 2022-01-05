const express = require("express");
const router = express.Router();
const studioTat = require("../usecases/Studio");

<<<<<<< Updated upstream
router.post("/",async (request, response, next) => {
    try{
        const studioData = request.body;
        const studioId = request.id
        const studioCreated=await studio.create(studioId,studioData);
=======

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
>>>>>>> Stashed changes
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