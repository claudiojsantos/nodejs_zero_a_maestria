const chalk = require('chalk')
const inquirer = require('inquirer')

inquirer.prompt([
    {
        name: 'p1',
        message: 'Digite seu nome: '
    },
    {
        name: 'p2',
        message: 'Digite sua idade: '
    }
]).then((asnwer) => {
    console.log(chalk.bgYellow.black(`Seu nome é ${asnwer.p1} e sua idade é ${asnwer.p2} anos`))
}).catch((err) => { console.error(err) })