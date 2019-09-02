import React, { useState, useEffect } from 'react'
import { Hero, PortfolioRoll, Loading } from '../../components'
import { getPortfolios } from '../../helpers'

export default function Portafolio () {
  const [page, setPage] = useState(0)
  const [portfolios, setPortfolios] = useState([])
  const { data, loading } = getPortfolios(page)

  const setPortfoliosState = () => {
    return data && setPortfolios(data.portfolios)
  }

  const loadMore = () => {
    setPage(page + 10)
    setPortfolios(
      ...portfolios,
      data.portfolios
    )
  }

  useEffect(() => {
    setPortfoliosState()
  }, [])

  return data ? (
    <>
      {console.log(portfolios)}
      <Hero img='/static/portafolio.jpg' title='Portafolio' />
      <PortfolioRoll portfolios={portfolios} loadMore={loadMore} />
    </>
  ) : loading ? (
    <Loading />
  ) : (
    'Error!'
  )
}
