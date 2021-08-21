import React from 'react'
import { render } from '../testUtils'
import { HomePage } from '@/pages'

describe('HomePage', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<HomePage />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  // it('clicking button triggers alert', () => {
  //   const { getByText } = render(<Home />, {})
  //   window.alert = jest.fn()
  //   fireEvent.click(getByText('Test Button'))
  //   expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  // })
})
