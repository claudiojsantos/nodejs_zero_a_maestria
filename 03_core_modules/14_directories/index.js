const fs = require('fs');

if (!fs.existsSync('minha_pasta')) {
    console.error('Não existe')
    fs.mkdirSync('minha_pasta')
} else {
    console.log('Existe')
}

