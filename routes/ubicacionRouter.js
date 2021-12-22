const express = require("express");
const router = express.Router();
const localidad = require("../usecases/ubicacion");

router.get("/:cp", async (request, response, next) => {
  const {cp} = request.params   
  try {
    const localidades = await localidad.find(cp);
    response.json({
      ok: true,
      message: "Done",
      payload: localidades,
    });
  } catch (error) {
    next(error);
    //console.log(error)
  }
});

router.get("/",async (request, response ,next)=>{
  try{    
   const all= await localidad.get();
   response.json({
       ok:true,
       message:"Done",
       listUser:{
        all
       }
   })
 }
  catch (error){
  next(error)
}
})



module.exports = router;
