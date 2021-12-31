const fs = require('fs');

console.log('Antes')

fs.writeFile('arquivo2.txt', 'arquivo criado', (err, data) => {
    if (err) {
        console.log(err)
    }

    setTimeout(() => {
        console.log('Arquivo Criado')
    }), 2000;
})

console.log('Fim')