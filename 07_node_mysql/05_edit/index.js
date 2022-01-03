const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const qtd = req.body.qtd;

  const sql = `INSERT INTO books (title, qtd_pages) VALUES ('${title}', '${qtd}')`;

  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/");
  });
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const books = data;

    res.render("books", { books });
  });
});

app.get("/book/:id", (req, res) => {
  const sql = `SELECT * FROM books WHERE id = ${req.params.id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }

    const book = data[0];

    res.render("book", { book });
  });
});

app.get("/book/edit/:id", (req, res) => {
  const sql = `SELECT * FROM books WHERE id = ${req.params.id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }

    const book = data[0];

    res.render("book_edit", { book });
  });
});

app.get("/", (req, res) => {
  res.render("home");
});

const conn = mysql.createConnection({
  host: "10.211.55.4",
  user: "root",
  password: "12345678",
  database: "nodemysql",
});

conn.connect((err) => {
  if (err) {
    console.error(err);
  }

  console.log("Banco MySQL conectado");

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
});
