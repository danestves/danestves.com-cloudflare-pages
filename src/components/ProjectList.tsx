// Dependencies
import * as React from 'react';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

type Technologies = {
  id: string;
  name: string;
};

type ProjectListProps = {
  project: {
    id: string;
    slug: string;
    cover: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    title: string;
    technologies?: [Technologies];
    sort: string;
  };
};

const ProjectList: React.FC<ProjectListProps> = ({ project }) => (
  <li key={project.id} className="flex flex-wrap py-8 md:flex-no-wrap">
    <div className="flex flex-col flex-shrink-0 w-full px-2 mb-6 md:w-64 md:mb-0">
      <Link to={`/project/${project.slug}`} className="block h-full">
        <Img fluid={project.cover.childImageSharp.fluid} className="object-cover w-full h-full" alt={project.title} />
      </Link>
    </div>

    <div className="px-2 md:flex-grow">
      <div className="flex mb-6 md:w-64 md:mb-0">
        {project?.technologies &&
          project.technologies.map(t => (
            <span
              key={t.id}
              className="inline-flex items-center px-2 py-1 text-xs font-medium leading-4 text-indigo-800 bg-indigo-200 rounded"
            >
              <svg className="w-2 h-2 mr-1 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
              </svg>
              {t.name}
            </span>
          ))}
      </div>
      <h2 className="mb-2 text-2xl font-medium text-gray-900 title-font dark:text-gray-300">
        <Link to={`/project/${project.slug}`}>{project.title}</Link>
      </h2>

      <p className="leading-relaxed text-gray-600">{project.sort}</p>

      <Link to={`/project/${project.slug}`} className="inline-flex items-center mt-4 text-indigo-500">
        Ver Projecto
        <svg
          className="w-4 h-4 ml-2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5l7 7-7 7"></path>
        </svg>
      </Link>
    </div>
  </li>
);

export default ProjectList;
