const rolRouter = require("./rolRouter");
const sizeRouter = require("./sizeRouter");
const adminRouter= require("./adminRouter");
const loginRouter= require("./loginRouter");
const staffRouter = require("./staffRouter");
const tattoInfoRouter= require("./tattooInfoRouter");
const studioRouter= require("./studioRouter")

const apiRouter = (app) => {
  app.use("/rols", rolRouter);
  app.use("/sizes", sizeRouter);
  app.use("/admin", adminRouter);
  app.use("/login", loginRouter);
  app.use("/staff",staffRouter);
  app.use("/tatooInfo", tattoInfoRouter);
  app.use("/studio", studioRouter)
};
module.exports = apiRouter;
