const inquirer = require('inquirer');

inquirer.prompt([
    {
        name: 'p1',
        message: 'Qual a primeira nota? '
    },
    {
        name: 'p2',
        message: 'Qual a segunda nota? '
    }
]).then((answer) => {
    console.log(answer)
    const media = (parseInt(answer.p1) + parseInt(answer.p2)) / 2
    console.log(`Sua média foi ${media}`)
}).catch(function (err) { console.error(err); });