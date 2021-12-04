const express = require("express");
const router = express.Router();
const login = require("../usecases/login");

router.post("/", async (req, res, next) => {
  try {
    const userAccess = req.body;
    const resFind = await login.find(userAccess);
    const { message } = resFind;
    if (message === 1) {
      res.status(202).json({
        status: "ingreso correcto",
      });
    } else if (message === 2) {
      res.status(404).json({
        status: "404-2",
      });
    } else if (message === 3) {
      res.status(404).json({
        status: "404-3",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
