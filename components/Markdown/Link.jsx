import React from 'react'
import { Link } from '@material-ui/core'

export default ({ href, children }) => (
  <Link href={href} target='_blank'>
    {children}
  </Link>
)
