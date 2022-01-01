import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que desejas fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answers) => {
      const action = answers["action"];

      if (action === "Criar Conta") {
        createAccount();
      } else if (action === "Consultar Saldo") {

      } else if (action === "Depositar") {
        deposity();
      } else if (action === "Sacar") {

      } else if (action === "Sair") {
        console.log(chalk.bgYellow.black.bold('Muito Obrigado por utilizar o Accounts!!!'));
        process.exit();
      }
    })
    .catch((err) => console.log(chalk.bgRed.bold(err)));
}

// Create an account
function createAccount() {
  console.log(chalk.bgBlue.bold("Parabéns por escolher nosso Banco"));
  console.log(chalk.green.bold("Selecione as opções da sua conta a seguir"));
  buildAccount()
}

function buildAccount() {
  inquirer.prompt([{
    name: 'accountName',
    message: 'Digite o nome do beneficiário: '
  }]).then(answers => {
    const accountName = answers['accountName']

    if (!fs.existsSync('accounts')) {
      fs.mkdirSync('accounts')
    }

    if (fs.existsSync(`accounts/${accountName}.json`)) {
      console.log(chalk.bgRed.bold('Erro ao criar Conta. Utilize uma nova identificação'))
      buildAccount()
    }

    fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', err => { console.log(err) })

    console.log(chalk.green('Parabéns, conta devidamente criada.'))

    operation()

  }).catch(err => { console.log(err) })
}

function deposity() {
  inquirer.prompt([{
    name: 'accountName',
    message: 'Digite o nome do beneficiário: '
  }]).then(answers => {
    if (!checkAccount(answers['accountName'])) {
      deposity();
    }
  }).catch(err => { console.log(err) })

}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Conta não encontrada. Por Favor, tente novamente!!!'))
    return false;
  }

  return true;
}
