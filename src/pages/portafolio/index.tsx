// Dependencies
import * as React from 'react'
import { NextPage } from 'next'

// Components
import { SEO } from '@/components'

const PortfolioPage: NextPage = () => {
  return (
    <>
      <SEO
        title="Portfolio"
        description="Portafolio de Daniel Esteves para mostrar sus proyectos realizados en todo su trayecto como desarrollador web frontend. React, NextJS, Gatsby y WordPress."
      />
    </>
  )
}

export default PortfolioPage
