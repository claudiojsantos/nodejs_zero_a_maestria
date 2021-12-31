const minimist = require('minimist');

const args = process.argv.slice(2)

console.log(args)

const nome = args[0].split('=')[1]

console.log(nome)

const profissao = args[1].split('=')[1]

console.log(profissao)

