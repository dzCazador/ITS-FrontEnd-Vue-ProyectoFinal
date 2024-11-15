import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://tasks.api.hvdevs.com/',
  withCredentials: true,
})

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  // Fetch CSRF token
  const csrf = await axios.get('https://tasks.api.hvdevs.com/auth/csrf')
  config.headers['X-CSRF-Token'] = csrf.data.csrfToken
  return config
})

export default instance
