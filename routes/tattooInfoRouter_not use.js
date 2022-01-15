const express = require("express");
const router = express.Router();
const infoTatoo = require("../usecases/tatooInfo");

//estos se mostrarian solo al administrador
router.get("/", async (request, response, next) => {
  try {
    const dates = await infoTatoo.get();
    response.json({
      ok: true,
      message: "Done",
      listUser: {
        dates,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:idDate", async (request, response, next) => {
  const { idDate } = request.params;
  try {
    const userId = await user.getById(idDate);
    response.json({
      ok: true,
      message: "Done",
      listUser: { idDate },
    });
  } catch (error) {
    //next(error)
    response.status(404).json({
      ok: false,
      message: "User not found",
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const infoTatooData = req.body;
    const dateCreated = await infoTatoo.create(infoTatooData);
    res.status(201).json({
      status: "ok",
      message: "date created",
      payload: {
        dateCreated,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//modificar usuario
// router.patch("/:dateId", async (req, res, next) => {
//   const { dateId } = req.params;
//   //const   userId   =request.id;
//   const dateData = req.body;
//   // if(idUser === userId)
//   // {
//   try {
//     const dateUpdate = await infoTatoo.update(dateId, dateData);
//     res.status(201).json({
//       ok: true,
//       message: `Actualizado`,
//       dateUpdate,
//     });
//   } catch (error) {
//     next(error);
//     res.status(404).json({
//       status: false,
//       message: "User not found",
//     });
//   }
//   //   }
//   // else{
//   //   response.status(404).json({
//   //       ok:false,
//   //       message: "Unauthorized",

//   //   })
//   // }
// });

module.exports = router;
