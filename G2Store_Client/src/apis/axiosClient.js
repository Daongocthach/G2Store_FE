import axios from 'axios'
import { toast } from 'react-toastify'
import { deleteCookie, getCookie } from '../utils/cookie'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

axiosClient.interceptors.request.use(async (config) => {
  const atk = getCookie('atk')
  if (atk) {
    config.headers.Authorization = `Bearer ${atk}`
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