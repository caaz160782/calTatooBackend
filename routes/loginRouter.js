const express = require("express");
const router = express.Router();
const login = require("../usecases/login");
const studioTat = require("../usecases/Studio");
const { emailVerifiqued } = require("../middlewares/typesVerified");

router.post("/", async (req, res, next) => {
  try {
    const userAccess = req.body;
    const resFind = await login.find(userAccess);
    const { message, token, infoUser } = resFind;
    if (message === 1) {
      let foundStudio;
      if (infoUser.rol === "Administrador") {
        foundStudio = await studioTat.getAdmin(infoUser._id);
      }
      if (infoUser.rol === "Cliente" || infoUser.rol === "tatuador") {
        foundStudio = await studioTat.getById(infoUser.idStudio);
      }
      let infoStudio = {};
      if (foundStudio !== null) {
        const { _id, name } = foundStudio;
        infoStudio = { id: _id.toString(), name: name };
      }
      res.status(202).json({
        autenticado: true,
        token: token,
        infoUser: infoUser,
        infoStudio,
      });
    } else if (message === 2) {
      res.status(404).json({
        code: "Email/PSW WRONG",
        message: "email or password wrong",
        error: "Email/PSW WRONG",
      });
    } else if (message === 3) {
      res.status(404).json({
        code: "EMAIL_NOT_FOUND",
        message: "email or password wrong",
        error: "email not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
