// Dependencies
import { FluidObject } from 'gatsby-image';

export type ArgsUseDocumentType = {
  previousScrollTop: number;
  currentScrollTop: number;
};

export type HomeType = {
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

export type CurriculumItemType = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  finished: boolean;
};

export type CareerType = {
  id: number;
  title: string;
  logo: string;
  golden_achievement: string;
  diploma_link: string;
  active: boolean;
};

export type CourseType = {
  id: number;
  title: string;
  badge: string;
  url: string;
  career: string;
  diploma_link: string;
};

type Technologies = {
  id: string;
  name: string;
};

export type ProjectCardType = {
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
};

export type PortfolioCardType = {
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
};

export type TagType = {
  id: string;
  name: string;
};

export type BlogCardType = {
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
};
