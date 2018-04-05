'use strict'

/* global location fetch */

async function preload() {
  try {
    if (!(/^\?preload=/).test(location.search)) return
    const fileUrl = location.search.replace(/^\?preload=/, '')
    const fileData = await fetch(fileUrl, { mode: 'no-cors' })
    const txt = await fileData.text()
    window.renderTurbolizerData(txt)
  } catch (err) {
    console.error(err)
  }
}

preload()
