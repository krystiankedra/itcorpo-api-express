const responseTime = (callback) => {
  if (typeof callback === 'function') {
      return function (req, res, next) {
          const start = new Date();
          res.on('finish', function () {
              const end = new Date();
              const duration = end - start;

              const url = req.url;
              const method = req.method;
              const statusCode = res.statusCode;
              const statusMessage = res.statusMessage;
              callback({
                url,
                method,
                duration,
                statusCode,
                statusMessage
              })
          })
          next()
      }
  } else {
      console.error('parameter required to be a callback function')
  }

}

const chalk = require('chalk')

const coloredByStatus = (statusCode) => {
  const statusType = (statusCode + '')[0]
  switch (statusType){
    case 2: return chalk.green
    case 3: return chalk.green
    case 4: return chalk.cyan
    case 5: return chalk.red
    default: return chalk.gray
  }
}

const coloredResponseTime = responseTime(({ method, url, duration, statusCode, statusMessage }) => {
  const color = coloredByStatus(statusCode)
  console.log(chalk.blue(method), url, color(statusCode, statusMessage), duration + 'ms')
})

module.exports = {
  responseTime,
  coloredByStatus,
  coloredResponseTime,
};
