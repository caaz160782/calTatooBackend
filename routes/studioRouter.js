const express = require("express");
const router = express.Router();
const studioTat = require("../usecases/Studio");

router.post("/",async (request, response, next) => {
    try{
        const studioData = request.body;
        const studioId = request.id
        const studioCreated=await studio.create(studioId,studioData);
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