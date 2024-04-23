import axios from 'axios'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})
const jwtAxios = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

axiosClient.interceptors.request.use(async (config) => {
  const atk = localStorage.getItem('atk')
  const rtk = localStorage.getItem('rtk')
  if (atk) {
    const date = new Date()
    const decodedToken = jwtDecode(atk)
    if (decodedToken.exp < date.getTime() / 1000) {
      try {
        const res = await jwtAxios.post('customers/refresh-token', { refresh_token: rtk })
        const newatk = res.data.token
        if (newatk) {
          localStorage.setItem('atk', newatk)
          config.headers.Authorization = `Bearer ${newatk}`
        }
      } catch (error) {
        if (error.response.status === 403 || error.response.status === 401) {
          localStorage.removeItem('atk')
          localStorage.removeItem('rtk')
        }
      }
    } else {
      config.headers.Authorization = `Bearer ${atk}`
    }
  }
  return config
})
axiosClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    toast.error(error?.response?.data?.message, { autoClose: 2000 })
    return Promise.reject(error)
  })
export default axiosClient