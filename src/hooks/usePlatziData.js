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
      await axios
        .get(
          "https://platzi-user-api.jecsham.com/api/v1/getUserSummary/@danestves"
        )
        .then(res => {
          setCareers(res.data.userData.careers)
          setCourses(res.data.userData.courses)
          setLoading(false)
        })
        .catch(err => console.error(err))
    } catch (error) {
      console.error(error)
    }
  }

  return { loading, careers, courses }
}
