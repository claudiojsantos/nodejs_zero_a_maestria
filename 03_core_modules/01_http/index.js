const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
    res.write('Olá HTTP')
    res.end()
})

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})