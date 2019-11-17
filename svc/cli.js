const argv = require('yargs')
  .option('port', {
    alias: 'p',
    default: 3020,
    describe: 'Service port',
    type: 'number'
  })
  .option('delay', {
    alias: 'd',
    default: 1000,
    describe: 'Minimum delay (+ random)',
    type: 'number'
  })
  .argv

module.exports = {
  argv
}
