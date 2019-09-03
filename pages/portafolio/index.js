import React, { useState, useEffect } from 'react'
import { Hero, PortfolioRoll, Loading } from '../../components'
import { getPortfolios } from '../../helpers'

export default function Portafolio () {
  const [portfolios, setPortfolios] = useState([])
  const { data, loading } = getPortfolios()

  const setPortfoliosState = () => {
    return data && setPortfolios(data.portfolios)
  }

  useEffect(() => {
    setPortfoliosState()
  }, [portfolios])

  return data ? (
    <>
      <Hero img='/static/portafolio.jpg' title='Portafolio' />
      <PortfolioRoll portfolios={portfolios} />
    </>
  ) : loading ? (
    <Loading />
  ) : (
    'Error!'
  )
}
