const { projectDetailsURL } = require('./config')
const { getRequest } = require('./requests')

const getDataForProject = async (projectId) => {
  return await getRequest(projectDetailsURL(projectId))
}

module.exports = {
  getDataForProject
}
