const minimist = require('minimist');
const soma = require('./soma').soma;

const args = process.argv.slice(2);

const a = parseInt(args[0].split('=')[1])
const b = parseInt(args[1].split('=')[1])

soma(a, b)