// Dependencies
import * as React from 'react';
import { Link } from 'gatsby';

const CallToAction: React.FC = () => {
  return (
    <div className="w-full px-5 pt-12 bg-secondary">
      <div className="max-w-4xl pb-12 mx-auto border-b-2 border-primary">
        <h3 className="font-mono text-xl text-center md:text-3xl text-primary">¿Tienes una idea?</h3>
        <h2 className="mb-8 text-3xl font-bold text-center text-white md:text-5xl">¡Hagámosla realidad!</h2>

        <div className="flex justify-center mt-3">
          <Link
            to="/contacto"
            title="Escríbeme un mensaje"
            className="block px-8 py-3 font-mono text-lg font-semibold rounded-full bg-primary text-secondary"
          >
            Escríbeme un mensaje
          </Link>
        </div>

        <div className="flex justify-center mt-3">
          <a href="#!" className="block font-mono text-primary">
            Revisa mis servicios
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
