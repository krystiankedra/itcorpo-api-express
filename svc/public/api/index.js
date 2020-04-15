const { getDataForEmployee } = require('./employees')
const { getDataForProject } = require('./projects')

const getMergedDataEmployeesToProject = async (projectId) => {
  const project = await getDataForProject(projectId)
  const manager = await getDataForEmployee(project.manager)
  const projectEmployeesDataPromisses = project && project.team && project.team.map(emp => getDataForEmployee(emp.id))
  const team = await Promise.all(projectEmployeesDataPromisses)
  return {
    ...project,
    team,
    manager
  }
}

module.exports = {
  getMergedDataEmployeesToProject
}
