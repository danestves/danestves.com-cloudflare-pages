import { useState, useEffect } from "react"
import axios from "axios"

export default function() {
  const [loading, setLoading] = useState(true)
  const [careers, setCareers] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getDataFromPlatzi()
  }, [])

  const getDataFromPlatzi = async () => {
    try {
      const res = await axios.get(
        "https://platzi-user-api.jecsham.com/api/v1/getUserSummary/@danestves"
      )

      await setLoading(false)
      await setCareers(res.data.userData.careers)
      await setCourses(res.data.userData.courses)
    } catch (error) {
      console.error(error)
    }
  }

  return { loading, careers, courses }
}
