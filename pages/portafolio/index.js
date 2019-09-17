import React from 'react'
import Head from 'next/head'
import { Hero, PortfolioRoll, Loading } from '../../components'
import { KEYWORDS } from '../../constants'
import { getPortfolios } from '../../helpers'

export default function Portafolio() {
  const { data, loading } = getPortfolios()

  return (
    <>
      <Head>
        <title>Portafolio | Daniel Esteves - Desarrollador Web Frontend</title>
        <meta
          name='description'
          content='Portafolio de Daniel Esteves realizando proyectos en WordPress, React, Gatsby, NextJS y mucho más. Consulta aquí su trabajo en el mundo del desarrollo web.'
          key='description'
        />
        <meta
          name='keywords'
          content={`Portafolio, portafolio de daniel esteves, portafolio de danestves, ${KEYWORDS}`}
          key='keywords'
        />
        <meta
          property='og:title'
          content='Portafolio | Daniel Esteves - Desarrollador Web Frontend'
          key='og:title'
        />
        <meta
          property='og:description'
          content='Portafolio de Daniel Esteves realizando proyectos en WordPress, React, Gatsby, NextJS y mucho más. Consulta aquí su trabajo en el mundo del desarrollo web.'
          key='og:description'
        />
        <meta
          name='twitter:title'
          content='Portafolio | Daniel Esteves - Desarrollador Web Frontend'
          key='twitter:title'
        />
        <meta
          name='twitter:description'
          content='Portafolio de Daniel Esteves realizando proyectos en WordPress, React, Gatsby, NextJS y mucho más. Consulta aquí su trabajo en el mundo del desarrollo web.'
          key='twitter:description'
        />
        <meta
          name='twitter:image:alt'
          content='Portafolio | Daniel Esteves - Desarrollador Web Frontend'
          key='twitter:image:alt'
        />
      </Head>
      <Hero img='/static/portafolio.jpg' title='Portafolio' />
      {data ? (
        <>
          <PortfolioRoll portfolios={data.portfolios} />
        </>
      ) : loading ? (
        <Loading />
      ) : (
        'Error!'
      )}
    </>
  )
}
