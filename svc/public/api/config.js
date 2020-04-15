const projectDetailsURL = projectId => `http://localhost:3012/projects/${projectId}`

const employeeDetailsURL = employeeId => `http://localhost:3011/employees/${employeeId}`

const benefitsURL = () => `http://localhost:3013/benefits`

module.exports = {
  projectDetailsURL,
  employeeDetailsURL,
  benefitsURL
}
