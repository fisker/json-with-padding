import {getJsonpOptions} from './utils.js'

function createWorker(listener) {
  const blob = new Blob([
    `self.onmessage = ({data}) => (${listener.toString()})(data);`,
  ])
  const url = URL.createObjectURL(blob)
  const worker = new Worker(url)
  URL.revokeObjectURL(url)
  return worker
}

function workerMessageListener({url, callback}) {
  self[callback] = (data) => {
    delete self[callback]
    self.postMessage(data)
    self.close()
  }

  self.importScripts(url)
}

async function requestJsonp(baseUrl, options) {
  const requestOptions = getJsonpOptions(baseUrl, options)
  const worker = createWorker(workerMessageListener)
  worker.postMessage(requestOptions)

  let data

  try {
    data = await new Promise(function (resolve, reject) {
      worker.onmessage = ({data}) => resolve(data)
      worker.onerror = (errorEvent) => reject(new Error(errorEvent.message))
    })
  } finally {
    worker.terminate()
  }

  return data
}

export default requestJsonp
