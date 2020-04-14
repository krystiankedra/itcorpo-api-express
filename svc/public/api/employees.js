const { employeeDetailsURL } = require('./config')
const { getRequest } = require('./requests')

const getDataForEmployee = async (employeeId) => {
  return await getRequest(employeeDetailsURL(employeeId))
}

module.exports = {
  getDataForEmployee
}
