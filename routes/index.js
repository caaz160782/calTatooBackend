const rolRouter = require("./rolRouter");
const sizeRouter = require("./sizeRouter");
const adminRouter= require("./adminRouter");
const loginRouter= require("./loginRouter");
const clientAdminRouter= require("./clientAdminRouter");
const staffRouter = require("./staffRouter");
const tattoInfoRouter= require("./tattooInfoRouter");
const studioRouter= require("./studioRouter")
const clientModifiedRouter = require("./clientModifiedRouter");
const ubicacionRouter= require("./ubicacionRouter");

const apiRouter = (app) => {
  app.use("/rols", rolRouter);
  app.use("/sizes", sizeRouter);
  app.use("/admin", adminRouter);
  app.use("/login", loginRouter);
  app.use("/clientAdmin", clientAdminRouter);
  app.use("/staff",staffRouter);
  app.use("/tatooInfo", tattoInfoRouter);
  app.use("/studio", studioRouter);
  app.use("/clientModified", clientModifiedRouter);
  app.use("/localidad", ubicacionRouter);
};
module.exports = apiRouter;
