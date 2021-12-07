const express = require("express");
const router = express.Router();
const infoTatoo = require("../usecases/tatooInfo");

//estos se mostrarian solo al administrador
router.get("/",async (request, response ,next)=>{
  try{    
   const dates= await infoTatoo.get();
   response.json({
       ok:true,
       message:"Done",
       listUser:{
        dates
       }
   })
 }
  catch (error){
  next(error)
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
