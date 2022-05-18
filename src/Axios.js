import axios from 'axios'

let BASE_URL = 'http://localhost:8000/'
// let BASE_URL = process.env.NODE_ENV === 'local' ? 'http://localhost:8000/' : 'https://peaceful-cove-58620.herokuapp.com/'

const axiosInstance = axios.create({

  // baseURL: '',  // Keep this for future deployment

  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Authorization": "JWT " + localStorage.getItem('access_token'),
    "Content-Type": "application/json",
    "accept": "application/json"
  }    
})

export default axiosInstance;