import axios from 'axios'

const $host = axios.create({
  baseURL: 'https://62d45a565112e98e484e62f8.mockapi.io/api',
})

export { $host }
