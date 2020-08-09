// Dependencies
import { FluidObject } from 'gatsby-image';

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
