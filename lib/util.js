const chalk = require('chalk')

const logMessage = (getMessageFn) => {
  // setTimeout(() => {
    console.log(chalk.green('CONFIG >'), getMessageFn())
  // }, 0)
}

const logError = (getMessageFn) => {
  console.log(chalk.red('ERROR >'), getMessageFn())
}

module.exports = {
  logMessage,
  logError
}
