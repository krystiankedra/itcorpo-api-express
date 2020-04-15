const { getDataForEmployee } = require('./employees')
const { getDataForProject } = require('./projects')

const getMergedDataEmployeesToProject = async (projectId) => {
  const project = await getDataForProject(projectId)
  const projectEmployeesDataPromisses = project && project.team && project.team.map(emp => getDataForEmployee(emp.id))
  project.team = await Promise.all(projectEmployeesDataPromisses) || []
  return project
}

module.exports = {
  getMergedDataEmployeesToProject
}
