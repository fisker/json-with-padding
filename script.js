import loadScript from 'browser-load-script'
import {getJsonpOptions} from './utils.js'

async function requestJsonp(baseUrl, options) {
  const {url, callback} = getJsonpOptions(baseUrl, options)

  let data
  window[callback] = (callbackData) => {
    data = callbackData
  }

  try {
    await loadScript(url)
  } finally {
    delete window[callback]
  }

  return data
}

export default requestJsonp
