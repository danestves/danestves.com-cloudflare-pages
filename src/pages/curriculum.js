// Dependencies
import React from "react"
import { graphql } from "gatsby"

// Components
import { Fade, SEO, Layout } from "../components"

// Icons
import { CheckIcon, ClockIcon } from "../icons"

export default ({ data }) => (
  <Layout>
    <SEO
      isTemplate
      title="Curriculum"
      description="Experiencia y educicación de Daniel Esteves obtenido a través del tiempo ejerciendo su trabajo como desarrollador web. Empleando tecnologías como React y WordPress."
    />

    <div className="flex flex-wrap py-5">
      <div className="w-full px-5 md:w-1/2">
        <h2 className="text-3xl text-center">Experiencia</h2>

        {data &&
          data.allStrapiExperiences.nodes.map(item => (
            <Fade
              className="flex items-center w-full px-8 py-4 my-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
              key={item.id}
            >
              <div className="w-4/5 pr-1">
                <h3 className="leading-none text-gray-500">
                  {item.subtitle} | {item.date}
                </h3>
                <h2 className="text-lg">{item.title}</h2>

                <p className="mt-3 text-base text-gray-700 dark:text-gray-600">
                  {item.content}
                </p>
              </div>
              <div className="w-1/5">
                {item.finished ? (
                  <CheckIcon className="block w-12 h-12 p-3 mx-auto text-white bg-green-600 rounded-full fill-current" />
                ) : (
                  <ClockIcon className="block w-12 h-12 p-3 mx-auto text-white bg-indigo-700 rounded-full fill-current" />
                )}
              </div>
            </Fade>
          ))}
      </div>
      <div className="w-full px-5 md:w-1/2">
        <h2 className="text-3xl text-center">Educación</h2>

        {data &&
          data.allStrapiEducations.nodes.map(item => (
            <Fade
              className="flex items-center w-full px-8 py-4 my-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
              key={item.id}
            >
              <div className="w-4/5 pr-1">
                <h3 className="leading-none text-gray-500">
                  {item.subtitle} | {item.date}
                </h3>
                <h2 className="text-lg">{item.title}</h2>

                <p className="mt-3 text-base text-gray-700 dark:text-gray-600">
                  {item.content}
                </p>
              </div>
              <div className="w-1/5">
                {item.finished ? (
                  <CheckIcon className="block w-12 h-12 p-3 mx-auto text-white bg-green-600 rounded-full fill-current" />
                ) : (
                  <ClockIcon className="block w-12 h-12 p-3 mx-auto text-white bg-indigo-700 rounded-full fill-current" />
                )}
              </div>
            </Fade>
          ))}
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  query EducationsAndExperiences {
    allStrapiEducations(
      sort: { order: [ASC, DESC, DESC], fields: [finished, date, title] }
    ) {
      nodes {
        id
        title
        subtitle
        content
        date
        finished
      }
    }
    allStrapiExperiences(
      sort: { order: [ASC, DESC, DESC], fields: [finished, date, title] }
    ) {
      nodes {
        id
        title
        subtitle
        content
        date
        finished
      }
    }
  }
`
