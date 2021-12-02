const rolRouter = require("./rolRouter");
const sizeRouter = require("./sizeRouter");

const apiRouter = (app) => {
  app.use("/rols", rolRouter);
  app.use("/sizes", sizeRouter);
};
module.exports = apiRouter;
