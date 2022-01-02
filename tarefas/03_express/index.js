const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

const basePath = path.join(__dirname, "/templates");

app.use(express.static("public"));

const sobre = require("./sobre");

app.use("/sobre", sobre);

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
