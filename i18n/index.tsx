export interface MyLocale {
  defaultSeo: {
    title: string
    description: string
    shareImage: string
  }
  header: {
    menu: {
      home: string
      aboutMe: string
      openSource: string
      portfolio: string
      blog: string
      contact: string
    }
  }
  home: {
    summary: string
    buttons: {
      contact: {
        label: string
      }
    }
    videos: {
      title: string
    }
    posts: {
      title: string
    }
  }
  aboutMe: {
    seo: {
      title: string
      description: string
    }
    intro: string
    summary: {
      p1: string
      p2: string
      p3: string
      sign: string
    }
    experience: {
      title: string
    }
  }
  openSource: {
    seo: {
      title: string
      description: string
    }
    highlights: {
      title: string
    }
    repositories: {
      title: string
    }
  }
  portfolio: {
    seo: {
      title: string
      description: string
    }
    title: string
    portfolios: {
      button: {
        label: string
      }
      industry: string
      technology: string
      web: string
    }
  }
  blog: {
    seo: {
      title: string
      description: string
    }
    publishedAt: string
    visits: string
    alert: {
      text: string
      button: {
        label: string
      }
    }
    commentOnTwitter: string
  }
  contact: {
    seo: {
      title: string
      description: string
    }
    title: string
    subtitle: string
    summary: string
    steps: {
      first: string
      second: string
      third: string
      fourth: string
      fifth: string
      sixth: string
    }
    form: {
      name: {
        label: string
      }
      email: {
        label: string
      }
      subject: {
        label: string
      }
      message: {
        label: string
      }
      button: {
        label: string
      }
    }
  }
  newsletter: {
    title: string
    summary: string
    form: {
      label: string
      placeholder: string
      button: {
        sending: string
        label: string
      }
    }
    response: {
      email: {
        required: string
      }
      success: string
    }
    subscribed: string
  }
  cta: {
    gif: {
      alt: string
    }
    title: string
    summary: string
    button: {
      label: string
    }
  }
  footer: {
    copyright: string
  }
}
