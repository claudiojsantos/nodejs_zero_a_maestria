const express = require("express");
const path = require("path");
const router = express.Router();

const basePath = path.join(__dirname, "../templates");

router.get("/", (req, res) => {
  res.sendFile(`${basePath}/sobre.html`);
});

module.exports = router;
