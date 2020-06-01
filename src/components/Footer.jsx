// Dependencies
import React from 'react';
import { FaGithubAlt, FaYoutube, FaTwitter } from 'react-icons/fa';

export default () => (
  <footer className="py-5 mt-12 bg-white shadow dark:bg-gray-800">
    <div className="container flex flex-wrap items-center justify-between px-5">
      <p className="text-sm">
        Daniel Esteves © <span id="year" /> - Todos los derechos reservados
      </p>

      <ul className="flex">
        <li className="mx-2">
          <a
            href="https://github.com/danestves"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithubAlt size="20" />
          </a>
        </li>

        <li className="mx-2">
          <a
            href="https://www.youtube.com/channel/UC6YYVDKZC3mu1iB8IOCFqcw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube size="20" />
          </a>
        </li>

        <li className="mx-2">
          <a
            href="https://twitter.com/danestves"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size="20" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
);
