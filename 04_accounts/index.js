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
        getAccountBalance();
      } else if (action === "Depositar") {
        deposity();
      } else if (action === "Sacar") {
        withdraw();
      } else if (action === "Sair") {
        console.log(
          chalk.bgYellow.black.bold("Muito Obrigado por utilizar o Accounts!!!")
        );
        process.exit();
      }
    })
    .catch((err) => console.log(chalk.bgRed.bold(err)));
}

// Create an account
function createAccount() {
  console.log(chalk.bgBlue.bold("Parabéns por escolher nosso Banco"));
  console.log(chalk.green.bold("Selecione as opções da sua conta a seguir"));
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome do beneficiário: ",
      },
    ])
    .then((answers) => {
      const accountName = answers["accountName"];

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.bold(
            "Erro ao criar Conta. Utilize uma nova identificação"
          )
        );
        buildAccount();
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        (err) => {
          console.log(err);
        }
      );

      console.log(chalk.green("Parabéns, conta devidamente criada."));

      operation();
    })
    .catch((err) => {
      console.log(err);
    });
}

function deposity() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome do beneficiário: ",
      },
    ])
    .then((answers) => {
      if (!checkAccount(answers["accountName"])) {
        deposity();
      }

      const accountName = answers["accountName"];

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Digite o valor a depositar",
          },
        ])
        .then((answer) => {
          const ammount = answer["amount"];

          addAmount(accountName, ammount);

          operation();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black("Conta não encontrada. Por Favor, tente novamente!!!")
    );
    return false;
  }

  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde")
    );

    deposity();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => {
      console.log(err);
    }
  );

  console.log(
    chalk.green(
      `Foi depositado o vakor de R$ ${amount.toLocaleString("pt-br", {
        style: "currency",
        currency: "UBRL",
      })} na conta.`
    )
  );
}

function getAccount(accountName) {
  const accountJSON = JSON.parse(
    fs.readFileSync(`accounts/${accountName}.json`, {
      encoding: "utf8",
      flag: "r",
    })
  );

  return accountJSON;
}

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome do beneficiário",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      console.log(chalk.bgBlue(`Seu saldo é de R$ ${accountData.balance}`));

      operation();
    })
    .catch((err) => {
      console.log(err);
    });
}

function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome do beneficiário",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Digite o valor a sacar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          removeAmount(accountName, amount);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.log(err);
      operation();
    });
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed("Ocorreu um erro, tente novamente mais tarde"));
    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed("Valor indisponível"));
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => {
      console.log(err);
    }
  );

  console.log(
    chalk.green(`Foi realizado um saque de R$ ${amount} de sua conta.`)
  );

  operation();
}
