const jwt = require("../lib/jwt");
const { validationResult } = require("express-validator");
const User = require("../models/users").model;

const validarCampos = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error);
  }
  next();
};

const isAdmin = (req, res, next) => {
  const { apitoken } = req.headers;
  //console.log("apitoken", apitoken);
  if (apitoken !== undefined) {
    try {
      const verify = jwt.verify(apitoken); //valida que el token se valido
      const { rol, sub } = verify;
      if (rol === "Administrador") {
        req.id = sub;
        next();
      } else {
        res.status(403).json({
          code: "Unauthorized",
          message: "Unauthorized",
          error: "no esta autorizado",
        });
      }
    } catch (error) {
      let { name } = error;
      if (name === "TokenExpiredError") {
        res.status(401).json({
          code: "TokenExpiredError",
          message: "timeExpired",
          error: "token expirado",
        });
      } else if (name === "JsonWebTokenError") {
        res.status(403).json({
          code: "TokenExpiredError",
          message: "Unauthorized",
          error: "no esta autorizado",
        });
      }
    }
  } else {
    res.status(403).json({
      code: "TokenNotExist",
      message: "Unauthorized",
      error: "no esta autorizado",
    });
  }
};

const isMember = (req, res, next) => {
  const { apitoken } = req.headers;
  if (apitoken !== undefined) {
    try {
      const verify = jwt.verify(apitoken); //valida que el token se valido
      const { rol, sub } = verify;
      if (rol === "Administrador" || rol === "Staff") {
        req.id = sub;
        next();
      } else {
        res.status(403).json({
          code: "Unauthorized",
          message: "Unauthorized",
          error: "no esta autorizado",
        });
      }
    } catch (error) {
      let { name } = error;
      if (name === "TokenExpiredError") {
        res.status(401).json({
          code: "TokenExpiredError",
          message: "timeExpired",
          error: "no esta autorizado",
        });
        S;
      } else if (name === "JsonWebTokenError") {
        res.status(403).json({
          ok: false,
          message: "Unauthorized",
          error: "no esta autorizado",
        });
      }
    }
  } else {
    res.status(403).json({
      code: "TokenNotExist",
      message: "Unauthorized",
      error: "no esta autorizado",
    });
  }
};

const isRegister = (req, res, next) => {
  const { apitoken } = req.headers;

  if (apitoken !== undefined) {
    try {
      const verify = jwt.verify(apitoken); //valida que el token se valido
      const { rol, sub } = verify;

      if (rol === "Administrador" || rol === "tatuador" || rol === "Cliente") {
        req.id = sub;
        next();
      } else {
        res.status(403).json({
          code: "Unauthorized",
          message: "Unauthorized",
          error: "no esta autorizado",
        });
      }
    } catch (error) {
      let { name } = error;
      if (name === "TokenExpiredError") {
        res.status(401).json({
          code: "TokenExpiredError",
          message: "timeExpired",
          error: "no esta autorizado",
        });
        S;
      } else if (name === "JsonWebTokenError") {
        res.status(403).json({
          ok: false,
          message: "Unauthorized",
          error: "no esta autorizado",
        });
      }
    }
  } else {
    res.status(403).json({
      code: "TokenNotExist",
      message: "Unauthorized",
      error: "no esta autorizado",
    });
  }
};

const correoExiste = async (req, res, next) => {
  const { email } = req.body;
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    res.status(404).json({
      code: "CORREO_EXIST",
      message: "el correo ingresado ya existe ",
      error: "correo ya existe",
    });
  } else {
    next();
  }
};

const isClient = (req, res, next) => {
  const { apitoken } = req.headers;
  const verify = jwt.verify(apitoken);
  const { rol, sub } = verify;
  if (rol === "Cliente") {
    req.id = sub;
    next();
  } else {
    res.status(403).json({
      message: " Unauthorized",
      error: "no esta autorizado",
    });
  }
};

module.exports = {
  isAdmin,
  validarCampos,
  isClient,
  isMember,
  correoExiste,
  isRegister,
};
