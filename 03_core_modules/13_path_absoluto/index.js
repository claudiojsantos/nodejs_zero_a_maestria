const path = require('path')

// Path absoluto
console.log(path.resolve('teste.txt'))

// Formar Path
const midFolder = 'sistnet'
const fileName = 'claudio.txt'

const finalPath = path.join('/', 'arquivo', midFolder, fileName)

console.log(finalPath)