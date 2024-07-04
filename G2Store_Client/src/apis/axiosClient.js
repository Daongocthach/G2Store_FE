import axios from 'axios'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
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
        const res = await axiosClient.post('customers/refresh-token', { refresh_token: rtk })
        const newatk = res?.data?.access_token
        const newrtk = res?.data?.refresh_token
        if (newatk) {
          localStorage.setItem('atk', newatk)
          localStorage.setItem('rtk', newrtk)
          config.headers.Authorization = `Bearer ${newatk}`
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          localStorage.removeItem('atk')
          localStorage.removeItem('rtk')
        }
      }
    }
    else {
      config.headers.Authorization = `Bearer ${atk}`
    }
  }
  return config
})
axiosClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error?.response?.data?.message === 'Token is no longer valid, please replace new access token') {
      localStorage.removeItem('atk')
      localStorage.removeItem('rtk')
      localStorage.removeItem('persist:root')
    }
    toast.error(error?.response?.data?.message, { autoClose: 2000 })
    return Promise.reject(error)
  })
export default axiosClient