const pause = require('connect-pause')
const { logMessage } = require('../lib/util')

module.exports = (baseDelay) => {
  logMessage(() => `Base delay is ${baseDelay}`)
  const getDelay = () => 500 + Math.random() * baseDelay

  return function delay(req, res, next) {
    const delayMS = getDelay()
    pause(delayMS)(req, res, next)
  }
}
