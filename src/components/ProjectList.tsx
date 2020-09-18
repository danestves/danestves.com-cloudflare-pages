// Dependencies
import * as React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

// Interfaces
import { IProjectCard } from '../types';

type Props = {
  project: IProjectCard;
};

const ProjectList: React.FC<Props> = ({ project }) => (
  <li key={project.id} className="grid items-center grid-cols-1 gap-16 py-8 md:grid-cols-2">
    <div>
      <Link to={`/project/${project.slug}/`} className="block h-full overflow-hidden rounded-2xl">
        <Img fluid={project.cover.childImageSharp.fluid} className="object-cover w-full h-full" alt={project.title} />
      </Link>
    </div>

    <div className="px-2 md:flex-grow">
      <h2 className="mb-2 text-2xl font-bold text-secondary">
        <Link to={`/project/${project.slug}`}>{project.title}</Link>
      </h2>

      <p className="font-mono text-lg text-secondary">{project.sort}</p>
    </div>
  </li>
);

export default ProjectList;
