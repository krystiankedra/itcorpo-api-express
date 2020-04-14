const projectDetailsURL = projectId => `http://localhost:3012/projects/${projectId}`

const employeeDetailsURL = employeeId => `http://localhost:3011/employees/${employeeId}`

module.exports = {
  projectDetailsURL,
  employeeDetailsURL
}
