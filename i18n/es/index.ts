// Internals
import { contentcard, layout, switcher, views } from './components'
import header from './header'
import calltoaction from './sections/calltoaction'
import hero from './sections/hero'
import latest from './sections/latest'
import search from './search'
import type { Locale } from '../'

export const table: Locale = {
  components: {
    contentcard,
    layout,
    switcher,
    views,
  },
  header,
  search,
  sections: {
    calltoaction,
    hero,
    latest: {
      posts: latest.posts,
      videos: latest.videos,
    },
  },
}
