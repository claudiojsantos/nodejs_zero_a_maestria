const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const basePath = path.join(__dirname, "templates");

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

const checkAuth = (req, res, next) => {
  req.authStatus = false;

  if (req.authStatus == true) {
    console.log("Login habilitado");
    next();
  } else {
    console.log("Login desabilitado");
    next();
  }
};

app.use(checkAuth);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
