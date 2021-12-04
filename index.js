const config = require("./lib/config");
const apiRouter = require("./routes");
const express = require("express");
const port = config.app.port;
const db = require("./lib/db");
const cors = require("cors");
const app = express();

//escucha todas las solicitudes para parsear a json
app.use(express.json());
app.use(cors());
apiRouter(app);
//levantar el servidor
app.listen(port, () => {
  console.log(`listening on port: htpp://localhost: ${port}`);
  db.connect()
    .then(() => {
      console.log("DB conected");
    })
    .catch((err) => {
      console.error("Connection refused", err);
    });
});
