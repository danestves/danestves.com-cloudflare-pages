import React from "react"

import { Fade } from "../components"
import Layout from "../components/layout"
import { usePlatziData } from "../hooks"

export default () => {
  const { loading, courses, careers } = usePlatziData()

  const coursesJS = courses.filter(course => {
    if (course.career !== null) {
      return (
        course.career.toLowerCase().match("js") ||
        course.career.toLowerCase().match("javascript") ||
        course.title.toLowerCase().match("javascript") ||
        course.title.toLowerCase().match("js")
      )
    }
  })

  const coursesEnglish = courses.filter(course => {
    if (course.career !== null) {
      return (
        course.career.toLowerCase().match("ingles") ||
        course.career.toLowerCase().match("inglés") ||
        course.title.toLowerCase().match("ingles") ||
        course.title.toLowerCase().match("inglés")
      )
    }
  })

  const coursesOther = courses.filter(course => {
    if (course.career !== null) {
      return (
        !course.career.toLowerCase().match("ingles") &&
        !course.career.toLowerCase().match("inglés") &&
        !course.title.toLowerCase().match("ingles") &&
        !course.title.toLowerCase().match("inglés") &&
        !course.career.toLowerCase().match("js") &&
        !course.career.toLowerCase().match("javascript") &&
        !course.title.toLowerCase().match("javascript") &&
        !course.title.toLowerCase().match("js")
      )
    }
  })

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : courses && careers ? (
        <div className="flex flex-wrap items-center justify-center">
          <Fade className="w-full">
            <h2 className="my-4 text-3xl text-center">Carreras</h2>
          </Fade>

          {careers &&
            careers.map(career => (
              <div
                className="w-full px-2 my-2 sm:w-1/2 md:w-1/3"
                key={career.id}
              >
                <a
                  href={`https://platzi.com/${career.diploma_link}`}
                  className="block p-3 bg-white border border-transparent rounded-lg shadow dark:bg-indigo-900 hover:shadow-lg dark:shadow-white dark:hover:shadow-white-lg transition-all transition-250 hover:border-indigo-700 dark:hover:border-white"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-1/4">
                      <img
                        src={career.golden_achievement}
                        alt={`${career.title} | Daniel Esteves`}
                        height="75px"
                        width="75px"
                        className="block mx-auto"
                      />
                    </div>
                    <div className="w-3/4 px-3">
                      <h3 className="text-xl font-semibold">{career.title}</h3>
                    </div>
                  </div>
                </a>
              </div>
            ))}

          <Fade className="w-full">
            <h2 className="my-4 text-3xl text-center">JavaScript</h2>
          </Fade>

          {coursesJS &&
            coursesJS.map(course => (
              <Fade
                className="self-stretch w-full px-2 my-2 sm:w-1/2 md:w-1/3"
                key={course.id}
              >
                <a
                  href={`https://platzi.com/${course.diploma_link}`}
                  className="flex items-center h-full p-3 bg-white border border-transparent rounded-lg shadow dark:bg-indigo-900 hover:shadow-lg dark:shadow-white dark:hover:shadow-white-lg transition-all transition-250 hover:border-indigo-700 dark:hover:border-white"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-1/4">
                      <img
                        src={course.badge}
                        alt={`${course.title} | Daniel Esteves`}
                        height="75px"
                        width="75px"
                        className="block mx-auto"
                      />
                    </div>
                    <div className="w-3/4 px-3">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <h4 className="text-sm text-gray-500">
                        Carrera: {course.career}
                      </h4>
                    </div>
                  </div>
                </a>
              </Fade>
            ))}

          <Fade className="w-full">
            <h2 className="my-4 text-3xl text-center">Inglés</h2>
          </Fade>

          {coursesEnglish &&
            coursesEnglish.map(course => (
              <Fade
                className="self-stretch w-full px-2 my-2 sm:w-1/2 md:w-1/3"
                key={course.id}
              >
                <a
                  href={`https://platzi.com/${course.diploma_link}`}
                  className="flex items-center h-full p-3 bg-white border border-transparent rounded-lg shadow dark:bg-indigo-900 hover:shadow-lg dark:shadow-white dark:hover:shadow-white-lg transition-all transition-250 hover:border-indigo-700 dark:hover:border-white"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-1/4">
                      <img
                        src={course.badge}
                        alt={`${course.title} | Daniel Esteves`}
                        height="75px"
                        width="75px"
                        className="block mx-auto"
                      />
                    </div>
                    <div className="w-3/4 px-3">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <h4 className="text-sm text-gray-500">
                        Carrera: {course.career}
                      </h4>
                    </div>
                  </div>
                </a>
              </Fade>
            ))}

          <Fade className="w-full">
            <h2 className="my-4 text-3xl text-center">Otros</h2>
          </Fade>

          {coursesOther &&
            coursesOther.map(course => (
              <Fade
                className="self-stretch w-full px-2 my-2 sm:w-1/2 md:w-1/3"
                key={course.id}
              >
                <a
                  href={`https://platzi.com/${course.diploma_link}`}
                  className="flex items-center h-full p-3 bg-white border border-transparent rounded-lg shadow dark:bg-indigo-900 hover:shadow-lg dark:shadow-white dark:hover:shadow-white-lg transition-all transition-250 hover:border-indigo-700 dark:hover:border-white"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-1/4">
                      <img
                        src={course.badge}
                        alt={`${course.title} | Daniel Esteves`}
                        height="75px"
                        width="75px"
                        className="block mx-auto"
                      />
                    </div>
                    <div className="w-3/4 px-3">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <h4 className="text-sm text-gray-500">
                        Carrera: {course.career}
                      </h4>
                    </div>
                  </div>
                </a>
              </Fade>
            ))}
        </div>
      ) : (
        "Error!"
      )}
    </Layout>
  )
}
