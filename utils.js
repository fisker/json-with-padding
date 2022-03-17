const randomString = () =>
  (Math.random() * Date.now()).toString(16).replace('.', '').slice(0, 7)

const CALLBACK_FUNCTION_NAME_PREFIX = 'jsonp_callback_'
const DEFAULT_CALLBACK_PARAMETER_NAME = 'callback'

const getRequestOptions = (url, options) => {
  const {callback: parameterName} = {
    callback: DEFAULT_CALLBACK_PARAMETER_NAME,
    ...options,
  }

  const functionName = CALLBACK_FUNCTION_NAME_PREFIX + randomString()

  const separator = url.includes('?') ? '&' : '?'
  url += `${separator}${parameterName}=${functionName}`

  return {url, callback: functionName}
}

export {getRequestOptions}
