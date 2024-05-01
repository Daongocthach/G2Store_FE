import axiosClient from './axiosClient'
const authenApi = {
    login(data) {
        const url = 'customers/login'
        return axiosClient.post(url, data)
    },
    register(captcha, email, password) {
        const url = `customers/register?g-recaptcha-response=${captcha}`
        return axiosClient.post(url, { email, password })
    },
    activeAccount(otp) {
        const url = `customers/activate-account?verification-code=${otp}`
        return axiosClient.get(url)
    },
    logout() {
        const url = 'logout'
        return axiosClient.get(url)
    },
    me() {
        const url = 'customers/me'
        return axiosClient.get(url)
    },
    updateProfile(data) {
        const url = 'customers/me'
        return axiosClient.put(url, data)
    },
    updateEmail(data) {
        const url = 'customers/me/email'
        return axiosClient.put(url, data)
    },
    updatePhone(data) {
        const url = 'customers/me/phone-no'
        return axiosClient.put(url, data)
    },
    updatePassword(data) {
        const url = 'customers/me/password'
        return axiosClient.put(url, data)
    },
    updateAvatar: (formData) => {
        const url = 'customers/me/upload-avatar'
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        return axiosClient.put(url, formData, headers)
    }
}

export default authenApi