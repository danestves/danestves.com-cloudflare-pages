// Dependencies
import * as React from 'react';
import { graphql } from 'gatsby';

// Components
import { SEO, ProjectList, CallToAction } from '../components';

// Types
import { IProjectCard } from '../types';

type Props = {
  data: {
    allStrapiProjects: {
      nodes: [IProjectCard];
    };
  };
};

const Projects: React.FC<Props> = ({
  data: {
    allStrapiProjects: { nodes: projects },
  },
}) => {
  return (
    <>
      <SEO
        isTemplate
        title="Proyectos"
        description="Página de proyectos hechos por Daniel Esteves para demostrar sus conocimientos y ganas de aportar al mundo del Open Source. 🚀😎"
      />

      {/* Space for Header */}
      <div className="w-full min-h-20 bg-secondary"></div>

      <div className="w-full bg-white">
        <div className="container px-5 py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="sr-only">Apps</h1>

            {projects.map(project => (
              <ProjectList key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>

      <CallToAction />
    </>
  );
};

export const query = graphql`
  query allStrapiProjects {
    allStrapiProjects(sort: { fields: [title], order: [ASC] }) {
      nodes {
        id
        title
        slug
        sort
        cover {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        technologies {
          id
          name
        }
      }
    }
  }
`;

export default Projects;
