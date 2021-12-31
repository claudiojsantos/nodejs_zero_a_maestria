console.log(process.argv)

console.log(process.argv[2])

console.log(process.argv[3])

console.log(process.argv[2].split('='))

const nome = process.argv[2].split('=')[1]

const idade = process.argv[3].split('=')[1]

console.log(`O nome correto é: ${nome} e sua idade ${idade} anos`)