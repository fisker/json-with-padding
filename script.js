import loadScript from 'browser-load-script'
import {getRequestOptions} from './utils.js'

async function requestJsonp(baseUrl, options) {
  const {url, callback} = getRequestOptions(baseUrl, options)

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
