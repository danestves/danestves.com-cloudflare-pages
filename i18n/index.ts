export interface Locale {
  components: {
    contentcard: {
      published: string
    }
    footer: {
      rights: string
    }
    layout: {
      menu: {
        toggle: string
      }
    }
    search: {
      button: {
        label: string
      }
      footer: {
        credit: string
      }
      input: {
        cancel: string
        placeholder: string
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
  pages: {
    about: {
      buttons: string[]
      paragraphs: string[]
      seo: {
        title: string
        description: string
      }
      title: string
    }
    notFound: {
      caption: string
      cta: string
      popular: string
      seo: {
        title: string
        description: string
      }
      subtitle: string
      title: string
    }
    portfolio: {
      seo: {
        title: string
        description: string
      }
    }
    posts: {
      seo: {
        title: string
        description: string
      }
      slug: {
        published: string
        sharer: {
          share: string
          shared: string
          copied: string
        }
      }
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
