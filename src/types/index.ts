// Dependencies
import { FluidObject } from 'gatsby-image';

export interface ArgsUseDocumentType {
  previousScrollTop: number;
  currentScrollTop: number;
}

export interface HomeType {
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

export interface CurriculumItemType {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  finished: boolean;
}

export interface CareerType {
  id: number;
  title: string;
  logo: string;
  golden_achievement: string;
  diploma_link: string;
  active: boolean;
}

export interface CourseType {
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

export interface ProjectCardType {
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

export interface PortfolioCardType {
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

export interface BlogCardType {
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

export interface SinglePortfolio {
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
