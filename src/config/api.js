import axios from 'axios'

console.log("express uri from env", process.env.EXPRESS_URI)
const deployedServer = "https://sheltered-garden-84149.herokuapp.com/"
// const deployedServer = ""

// Create an axios instance
export default axios.create({
  baseURL: deployedServer || "http://localhost:3009",
  timeout: 5000,
  withCredentials: true
})