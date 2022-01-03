const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.use(express.static("public"));

const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  const items = ["item a", "item b", "item c"];

  res.render("dashboard", { items });
});

app.get("/post", (req, res) => {
  const post = {
    title: "Aprendendo Node.js",
    category: "JavaScript",
    body: "Este artigo vai te orientar a aprender NodeJS",
    comments: 4,
  };

  res.render("blogpost", { post });
});

app.get("/blog", (req, res) => {
  const post = [
    {
      title: "Aprendendo Node.js",
      category: "JavaScript",
      body: "Este artigo vai te orientar a aprender NodeJS",
      comments: 4,
    },
    {
      title: "Aprendendo Python",
      category: "Python",
      body: "Este artigo vai te orientar a aprender Python",
      comments: 5,
    },
    {
      title: "Aprendendo Java",
      category: "Java",
      body: "Este artigo vai te orientar a aprender Java",
      comments: 6,
    },
  ];

  res.render("blog", { post });
});

app.get("/", (req, res) => {
  const user = {
    name: "Claudio",
    surname: "Santos",
    age: 47,
  };

  const palavra = "Teste";

  const auth = true;

  const approved = false;

  res.render("home", { user: user, palavra, auth, approved });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
