const { getDataForEmployee } = require('./employees')
const { getDataForProject } = require('./projects')
const { getDataForBenefits, getJSONDataForBenefits, getCSVDataForBenefits } = require('./benefits')

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

const getBenefits = async () => {
  const [ benefits, benefitsJSON, benefitsCSV ] = await Promise.all([
    getDataForBenefits(),
    getJSONDataForBenefits(),
    getCSVDataForBenefits()
  ]) 
  return {
    ...benefits,
    ...benefitsCSV,
    ...benefitsJSON
  }
}

module.exports = {
  getMergedDataEmployeesToProject,
  getBenefits
}
