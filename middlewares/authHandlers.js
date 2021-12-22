const jwt = require("../lib/jwt");
const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error);
  }
  next();
};

const isAdmin = (req, res, next) => {
  const { apitoken } = req.headers;
  const verify = jwt.verify(apitoken);
  const { rol,sub } = verify;
  if (rol === "Administrador") {
    req.id=sub;
    next();
  } else {
    res.status(403).json({
      message: "Unauthorized",
    });
  }
};

const isStaff = (req,resp,next) =>{
  const { apitoken } = req.headers;
  const verif = jwt.verify(apitoken);
  const { rol,sub } = verify;
  if (rol === "Staff") {
    req.id = sub;
    next();
  } else {
    res.status(403).json({
      message: "Unauthorized",
    });
  }
};


const isClient = (req,res,next)=>{
  const {apitoken}= req.headers;
  const verify= jwt.verify(apitoken);
  const { rol,sub } = verify;
  if (rol === "Cliente"){
    req.id = sub;
      next();
  }else{
      res.status(403).json({
          message: " Unauthorized"
      }); 
  }
};

module.exports = { isAdmin, validarCampos, isClient, isStaff};
