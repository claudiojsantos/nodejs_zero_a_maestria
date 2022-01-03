const express = require("express");
const exphbs = require("express-handlebars");

const pool = require("./db/conn");

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

  const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`;
  const data = ["title", "qtd_pages", title, qtd];

  pool.query(sql, data, (err) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/");
  });
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";

  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const books = data;

    res.render("books", { books });
  });
});

app.get("/book/:id", (req, res) => {
  const sql = `SELECT * FROM books WHERE ?? = ?`;

  const data = ["id", req.params.id];

  pool.query(sql, data, (err, data) => {
    if (err) {
      console.log(err);
    }

    const book = data[0];

    res.render("book", { book });
  });
});

app.get("/book/edit/:id", (req, res) => {
  const sql = `SELECT * FROM books WHERE ?? = ?`;

  const data = ["id", req.params.id];

  pool.query(sql, data, (err, data) => {
    if (err) {
      console.log(err);
    }

    const book = data[0];

    res.render("book_edit", { book });
  });
});

app.post("/book/update", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const qtd = req.body.qtd;

  const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;

  const data = ["title", title, "qtd_pages", qtd, "id", id];

  pool.query(sql, data, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/books");
  });
});

app.post("/book/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM books WHERE ?? = ?`;

  const data = ["id", id];

  pool.query(sql, data, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect("/books");
  });
});

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
