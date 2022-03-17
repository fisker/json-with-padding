import loadScript from 'browser-load-script'

const randomString = () =>
  (Math.random() * Date.now()).toString(16).replace('.', '').slice(0, 7)

function requestJsonp(url, options) {
  const {callback: callbackParameterName} = {
    callback: 'callback',
    ...options,
  }

  url += url.includes('?') ? '&' : '?'
  url += callbackParameterName
  url += '='

  const callbackFunctionName = `jsonp_callback_${randomString()}`

  return new Promise(function (resolve, reject) {
    window[callbackFunctionName] = function (data) {
      try {
        resolve(data)
      } catch (error) {
        reject(error)
      } finally {
        delete window[callbackFunctionName]
      }
    }

    loadScript(url + callbackFunctionName)
  })
}

export default requestJsonp
