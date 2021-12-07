const express = require("express");
const router = express.Router();
const infoTatoo = require("../usecases/tatooInfo");

//estos se mostrarian solo al administrador
router.get("/",async (req, res ,next)=>{
  try{
   const dates= await infoTatoo.get();
   res.json({
       ok:true,
       message:"Done",
       listDate:{
        dates
       }
   })
 }
  catch (error){
  next(error)
}
})

router.get("/:idDate",async (req, res, next)=>{
  const {idDate} = req.params
  try{
      const dateId = await infoTatoo.getById(idDate)
      res.json({
              ok:true,
              message:"Done",
              listDate:{ dateId },
          })
   }
  catch (error){
  //next(error)
  res.status(404).json({
      ok:false,
      message:"Date not found"
 })
}
})


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

module.exports = router;
