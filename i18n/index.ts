export interface Locale {
  components: {
    contentcard: {
      published: string
    }
    layout: {
      menu: {
        toggle: string
      }
    }
    switcher: {
      theme: {
        label: string
      }
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
