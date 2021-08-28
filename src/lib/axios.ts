// Dependencies
import axiosInstance from 'axios'

const vercelURL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? process.env.NEXT_PUBLIC_VERCEL_URL
  : undefined
const baseURL =
  vercelURL || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://danestves.com'

export const axios = axiosInstance.create({
  baseURL,
})

export default axios
