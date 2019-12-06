import axios from 'axios'
import { Toast } from 'vant'

// axios.defaults.baseURL = 'http://192.168.0.138:7777'
axios.defaults.baseURL = 'http://47.107.184.14:7777'
// axios.defaults.baseURL = 'http://113.246.243.124:7777'

axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.data.code === -1) {
      Toast.fail(response.data.message)
    }
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        resolve(response && response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function getUrl() {
  var vars = [],
    hash
  var hashes = window.location.href
    .slice(window.location.href.indexOf('?') + 1)
    .split('&')

  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=')
    vars.push(hash[0])
    vars[hash[0]] = hash[1]
  }

  return vars
}
