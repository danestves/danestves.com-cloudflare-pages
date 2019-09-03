import React from 'react'
import { Hero, PortfolioRoll, Loading } from '../../components'
import { getPortfolios } from '../../helpers'

export default function Portafolio () {
  const { data, loading } = getPortfolios()

  return data ? (
    <>
      <Hero img='/static/portafolio.jpg' title='Portafolio' />
      <PortfolioRoll portfolios={data.portfolios} />
    </>
  ) : loading ? (
    <Loading />
  ) : (
    'Error!'
  )
}
