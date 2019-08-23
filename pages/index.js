import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ProTip from '../src/ProTip'
import Link from '../src/Link'
import { Slider } from '../components'

export default function Index () {
  return (
    <>
      <Slider />
      <Container maxWidth='sm'>
        <Box my={4}>
          <Typography variant='h4' component='h1' gutterBottom>
          Next.js example
          </Typography>
          <Link href='/about' as='/about/'>
          Go to the about page
          </Link>
          <ProTip />
        </Box>
      </Container>
    </>
  )
}
