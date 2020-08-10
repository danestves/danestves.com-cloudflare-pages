// Dependencies
import * as React from 'react';
import { FaGithubAlt, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => (
  <footer className="py-5 shadow bg-secondary">
    <div className="flex flex-wrap items-center justify-between max-w-4xl px-5 mx-auto">
      <p className="font-mono text-sm text-primary">
        Daniel Esteves © <span id="year" /> - Todos los derechos reservados
      </p>

      <ul className="flex">
        <li className="mx-2">
          <a
            href="https://github.com/danestves"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub de Daniel Esteves"
            className="text-primary"
          >
            <FaGithubAlt size="20" />
          </a>
        </li>

        <li className="mx-2">
          <a
            href="https://www.youtube.com/channel/UC6YYVDKZC3mu1iB8IOCFqcw"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube de Daniel Esteves"
            className="text-primary"
          >
            <FaYoutube size="20" />
          </a>
        </li>

        <li className="mx-2">
          <a
            href="https://twitter.com/danestves"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter de Daniel Esteves"
            className="text-primary"
          >
            <FaTwitter size="20" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
