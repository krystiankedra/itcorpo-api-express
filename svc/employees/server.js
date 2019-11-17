const jsonServer = require('json-server')
const express = require('express')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router('db.json')
// const db = router.db

const path = require('path')
const { argv } = require('../cli')
const { logMessage } = require('../../lib/util')

const delayingMiddleware = require('../../mw/delaying')
const pagingMiddleware = require('../../mw/paging')
const { coloredResponseTime } = require('../../mw/response-time')

server.use(coloredResponseTime)
server.use(pagingMiddleware(50))
server.use(delayingMiddleware(argv.delay))
server.use(express.static(path.join(__dirname, 'public')))
server.use(router)

server.listen(argv.port, () => {
  logMessage(() => console.log(`JSON Server (Employees) is running on http://localhost:${argv.p}`))
})
