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
        });
      }
    } catch (error) {
      let { name } = error;
      if (name === "TokenExpiredError") {
        res.status(401).json({
          code: "TokenExpiredError",
          message: "timeExpired",
        });
      } else if (name === "JsonWebTokenError") {
        res.status(403).json({
          ok: false,
          message: "Unauthorized",
        });
      }
    }
  } else {
    res.status(403).json({
      code: "TokenNotExist",
      message: "Unauthorized",
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
        });
      }
    } catch (error) {
      let { name } = error;
      if (name === "TokenExpiredError") {
        res.status(401).json({
          code: "TokenExpiredError",
          message: "timeExpired",
        });
        S;
      } else if (name === "JsonWebTokenError") {
        res.status(403).json({
          ok: false,
          message: "Unauthorized",
        });
      }
    }
  } else {
    res.status(403).json({
      code: "TokenNotExist",
      message: "Unauthorized",
    });
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
    });
  }
};

module.exports = { isAdmin, validarCampos, isClient, isMember };
