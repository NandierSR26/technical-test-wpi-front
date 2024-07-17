import axios from "axios"

export const api = () => {

  const axiosConfig = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
    timeout: 45000
  })


  return {}

}