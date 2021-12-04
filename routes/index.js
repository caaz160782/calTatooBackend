const rolRouter = require("./rolRouter");
const sizeRouter = require("./sizeRouter");
const adminRouter= require("./adminRouter");

const apiRouter = (app) => {
  app.use("/rols", rolRouter);
  app.use("/sizes", sizeRouter);
  app.use("/admin", adminRouter);

};
module.exports = apiRouter;
