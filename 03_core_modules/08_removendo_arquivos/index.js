const fs = require('fs');

fs.unlink('arquivo.txt', (err) => {
    if (err) {
        console.error(err);
    }

    console.log('Arquivo deletado com sucesso')
})