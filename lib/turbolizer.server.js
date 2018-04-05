'use strict'

const path = require('path')
const ecstatic = require('ecstatic')
const connect = require('connect')
const opener = require('opener')

function createServer(turboFilesDir, PORT = null) {
  const appDir = path.join(__dirname, '..')
  const ecstaticApp = ecstatic({ root: appDir })
  const ecstaticFiles = ecstatic({ root: turboFilesDir })
  const app = connect()
    .use('/', ecstaticApp)
    .use('/data/', ecstaticFiles)

  const server = app.listen(PORT)
  const { port } = server.address()
  const address = `http://localhost:${port}`
  return { server, address }
}

function openWithFile({ address, file }) {
  const url = `${address}?preload=${address}/data/${file}`
  opener(url)
}

module.exports = { createServer, openWithFile }
