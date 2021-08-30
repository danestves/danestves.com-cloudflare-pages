export interface Locale {
  components: {
    contentcard: {
      published: string
    }
    views: string
  }
  header: {
    switcher: {
      lang: string
    }
  }
  search: string
  sections: {
    calltoaction: {
      title: string
      text: string
      button: string
    }
    hero: {
      description: string
    }
    latest: {
      posts: {
        title: string
      }
      videos: {
        title: string
      }
    }
  }
}
