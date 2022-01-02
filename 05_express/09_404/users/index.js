const express = require("express");
const path = require("path");
const router = express.Router();

const basePath = path.join(__dirname, "../templates");

router.use(
  express.urlencoded({
    extended: true,
  })
);

router.use(express.json());

router.get("/add", (req, res) => {
  res.sendFile(`${basePath}/userForm.html`);
});

router.post("/save", (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const age = req.body.age;

  console.log(`O nome do usuário é ${name} e tem ${age} anos.`);

  res.sendFile(`${basePath}/userForm.html`);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  res.sendFile(`${basePath}/user.html`);

  console.log(`Acessando dados do usuário ${id}`);
});

module.exports = router;
