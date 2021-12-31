const fs = require('fs');

console.log('Antes')

fs.writeFileSync('arquivo.txt', 'Arquivo criado')

console.log('Depois')