const { getDataForEmployee } = require('./employees')
const { getDataForProject } = require('./projects')
const { getDataForBenefits, getJSONDataForBenefits, getCSVDataForBenefits, getDataForBenefitById } = require('./benefits')

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

  return [...benefits, ...benefitsJSON, ...benefitsCSV]
}

const getBenefit = async (id) => {
  const [ benefit, benefitsJSON, benefitsCSV ] = await Promise.all([
    getDataForBenefitById(id),
    getJSONDataForBenefits(),
    getCSVDataForBenefits()
  ])
  const getBenefitsById = (source, id) => {
    return source.filter(obj => obj.id === id)
  }
  const benefitFromJSON = getBenefitsById(benefitsJSON, id)
  const benefitFromCSV = getBenefitsById(benefitsCSV, id)
  return {
    benefit,
    benefitFromJSON,
    benefitFromCSV
  }
} 

module.exports = {
  getMergedDataEmployeesToProject,
  getBenefits,
  getBenefit
}
