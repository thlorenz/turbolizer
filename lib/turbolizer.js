'use strict'

const { promisify } = require('util')
const path = require('path')
const fs = require('fs')
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const access = promisify(fs.access)

async function canRead(p) {
  try {
    await access(p, fs.constants.R_OK)
    return true
  } catch (err) {
    return false
  }
}

async function findAllTurboFiles(root) {
  const allEntries = await readdir(root)
  const turboFiles = []
  for (const entry of allEntries) {
    if (!(/^turbo-.+\.json$/).test(entry)) continue

    const fullPath = path.join(root, entry)
    if (!(await canRead(fullPath))) continue
    if (!(await stat(fullPath)).isFile()) continue
    turboFiles.push({ fullPath, entry })
  }

  return turboFiles
}

function makeSelectable(arr) {
  const map = new Map()
  for (var i = 0; i < arr.length; i++) {
    map.set(`${i + 1}`, arr[i])
  }
  return map
}

async function mapAllTurboFiles(root) {
  const arr = await findAllTurboFiles(root)
  return makeSelectable(arr)
}

module.exports = {
    findAllTurboFiles
  , mapAllTurboFiles
}

