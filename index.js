import loadScript from 'browser-load-script'

const randomString = () =>
  (Math.random() * Date.now()).toString(16).replace('.', '').slice(0, 7)

async function requestJsonp(url, options) {
  const {callback: callbackParameterName} = {
    callback: 'callback',
    ...options,
  }

  url += url.includes('?') ? '&' : '?'
  url += callbackParameterName
  url += '='

  const callbackFunctionName = `jsonp_callback_${randomString()}`
  let data
  window[callbackFunctionName] = (callbackData) => {
    data = callbackData
  }

  try {
    await loadScript(url + callbackFunctionName)
  } finally {
    delete window[callbackFunctionName]
  }

  return data
}

export default requestJsonp
