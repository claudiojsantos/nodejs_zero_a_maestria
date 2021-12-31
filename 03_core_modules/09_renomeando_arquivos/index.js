const fs = require('fs')

const file = process.argv[2].split('=')[1]
const new_file = 'novo_arquivo.txt'

fs.rename(file, new_file, (err) => {
    if (err) {
        console.error(err)
    }

    console.log(`O arquivo ${file} foi renomeado para ${new_file}`)
})