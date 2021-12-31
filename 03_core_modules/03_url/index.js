const url = require('url');
const address = 'https://www.sistnet.com.br?products=macbook'
const urlParsed = new url.URL(address)

console.log(urlParsed.hostname)
console.log(urlParsed.pathname)
console.log(urlParsed.search)
console.log(urlParsed.searchParams)
console.log(urlParsed.searchParams.get('products'))