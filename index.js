import loadScript from 'browser-load-script'

const randomString = () =>
  (Math.random() * Date.now()).toString(16).replace('.', '').slice(0, 7)

const CALLBACK_FUNCTION_NAME_PREFIX = 'jsonp_callback_'
const DEFAULT_CALLBACK_PARAMETER_NAME = 'callback'

async function requestJsonp(url, options) {
  const {callback: callbackParameterName} = {
    callback: DEFAULT_CALLBACK_PARAMETER_NAME,
    ...options,
  }

  const callbackFunctionName = CALLBACK_FUNCTION_NAME_PREFIX + randomString()
  const separator = url.includes('?') ? '&' : '?'
  url += `${separator}${callbackParameterName}=${callbackFunctionName}`

  let data
  window[callbackFunctionName] = (callbackData) => {
    data = callbackData
  }

  try {
    await loadScript(url)
  } finally {
    delete window[callbackFunctionName]
  }

  return data
}

export default requestJsonp
