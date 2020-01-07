import axios from 'axios'

const deployedServer = process.env.EXPRESS_URI

// Create an axios instance
export default axios.create({
  baseURL: deployedServer || "http://localhost:3001",
  timeout: 5000,
  withCredentials: true
})