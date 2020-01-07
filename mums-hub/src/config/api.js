import axios from 'axios'

const deployedServer = ""

// Create an axios instance
export default axios.create({
  baseURL: deployedServer || "http://localhost:3000",
  timeout: 5000,
  withCredentials: true
})