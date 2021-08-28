// Dependencies
import * as React from 'react'

// Internals
import { HomePage } from '@/pages'
import { render } from '../testUtils'
import getVideos from '../__mocks__/youtube/videos'

describe('HomePage', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <HomePage
        videos={{
          videos: getVideos(),
        }}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
