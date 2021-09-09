// Dependencies
import { styled } from '@stitches/react'

export const Pre = styled('pre', {
  margin: '1em 0',
  padding: '0.5em',
  overflow: 'scroll',
  textAlign: 'left',
})

export const Line = styled('div', {
  display: 'table-row',
})

export const LineNumber = styled('span', {
  display: 'table-cell',
  opacity: 0.5,
  paddingRight: '1em',
  textAlign: 'right',
  userSelect: 'none',
})

export const LineContent = styled('span', {
  display: 'table-cell',
})
