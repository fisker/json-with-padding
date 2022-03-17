import {getRequestOptions} from './utils.js'

const workerCode = /* indent */ `
  self.onmessage = function (event) {
    const {url, callback} = event.data

    self[callback] = function (data) {
      delete self[callback]
      self.postMessage(data)
      self.close()
    }

    self.importScripts(url)
  }
`

function createWorker() {
  const blob = new Blob([workerCode])
  const url = URL.createObjectURL(blob)
  const worker = new Worker(url)
  URL.revokeObjectURL(url)
  return worker
}

async function requestJsonp(baseUrl, options) {
  const {url, callback} = getRequestOptions(baseUrl, options)
  const worker = createWorker()
  worker.postMessage({url, callback})

  return new Promise(function (resolve, reject) {
    worker.addEventListener('message', ({data}) => {
      resolve(data)
    })

    worker.addEventListener('error', ({message}) => {
      worker.terminate()
      reject(new Error(message))
    })
  })
}

export default requestJsonp
