const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.use(express.static("public"));

const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const products = [
  {
    name: "Macbook Pro",
    value: 10000,
    category: "computers",
    id: 123,
  },
  {
    name: "Monitor 23.5",
    value: 1500,
    category: "monitors",
    id: 456,
  },
  {
    name: "iPhone 13",
    value: 9000,
    category: "smartphones",
    id: 789,
  },
  {
    name: "Macbook Air",
    value: 6500,
    category: "computers",
    id: 321,
  },
];

app.get("/product/:id", (req, res) => {
  const index = products.findIndex((el) => el.id == req.params.id);

  const product = products[index];

  res.render("product", { product });
});

app.get("/", (req, res) => {
  res.render("home", { products });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
