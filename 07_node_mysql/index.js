const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home')
});

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'nodemysql'
})

conn.connect((err) => {
    if (err) {
        console.error(err);
    }

    console.log('Banco MySQL conectado');
    
    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
})
