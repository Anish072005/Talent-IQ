import axios from 'axios'
const axiosInstance =axios.create({
    basedURL:import.meta.env.VITE_API_URL,
    withCredentials:true //browers will send the cookies to server automaticallly ,on every single req
})
export default axiosInstance;