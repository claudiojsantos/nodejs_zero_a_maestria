const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.end('<h1>Este é o primeiro server com Node</h1>')
})

server.listen(port, () => {
    console.log(`Server listening port on port ${port}`)
})