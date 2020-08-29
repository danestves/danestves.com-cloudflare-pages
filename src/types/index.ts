// Dependencies
import { FluidObject } from 'gatsby-image';

export interface ArgsUseDocumentType {
  previousScrollTop: number;
  currentScrollTop: number;
}

export interface IHome {
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

export interface ICurriculumItem {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  finished: boolean;
}

export interface ICareer {
  id: number;
  title: string;
  logo: string;
  golden_achievement: string;
  diploma_link: string;
  active: boolean;
}

export interface ICourse {
  id: number;
  title: string;
  badge: string;
  url: string;
  career: string;
  diploma_link: string;
}

interface Technologies {
  id: string;
  name: string;
}

export interface IProjectCard {
  id: string;
  title: string;
  slug: string;
  sort: string;
  cover: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  technologies?: [Technologies];
}

export interface IPortfolioCard {
  id: string;
  slug: string;
  title: string;
  cover: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  category: {
    name: string;
  };
}

export interface TagType {
  id: string;
  name: string;
}

export interface IBlogCard {
  id: string;
  title: string;
  slug: string;
  ogCover: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  tags?: [TagType];
  createdAt: string;
  body: string;
}

export interface ISingleApp {
  id: string;
  title: string;
  slug: string;
  description: string;
  sort: string;
  cover: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  ogCover: {
    publicURL: string;
  };
  github: string;
  url: string;
  createdAt: string;
}

export interface ISingleBlog {
  id: string;
  slug: string;
  cover: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  ogCover: {
    publicURL: string;
  };
  title: string;
  tags: [TagType];
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISinglePortfolio {
  title: string;
  body: string;
  cover: {
    childImageSharp: {
      fluid: FluidObject;
    };
    publicURL: string;
  };
  ogCover: {
    publicURL: string;
  };
  category: {
    name: string;
  };
  technologies: [Technologies];
  url: string;
  createdAt: string;
  isActive: boolean;
}
