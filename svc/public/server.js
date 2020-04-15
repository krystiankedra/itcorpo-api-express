const express = require('express')
const app = express()
const PORT = 3010

const { getMergedDataEmployeesToProject, getBenefits } = require('./api/index')

app.get('/projects/:id', async (req, res, next) => {
  try {
    const projectId = req.params.id
    const mergedDataEmployeesToProject = await getMergedDataEmployeesToProject(projectId)
    res.send(mergedDataEmployeesToProject)
    next()
  } catch (error) {
    res.status(400).send(error)
  }
})

app.get('/benefits', async (req, res, next) => {
  try {
    const benefits = await getBenefits()
    res.send(benefits)
    next()
  } catch (error) {
    res.status(400).send(error)
  }
}) 

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})


