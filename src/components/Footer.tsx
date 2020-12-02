// Dependencies
import * as React from 'react'
import { FaGithubAlt, FaYoutube, FaTwitter } from 'react-icons/fa'

const Footer = (): JSX.Element => (
  <footer className="py-5 bg-secondary">
    <div className="container flex flex-wrap items-center justify-between px-5">
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

    <div className="container mt-8">
      <p className="font-mono text-sm text-center text-primary">
        Designed by{` `}
        <a href="https://twitter.com/vibrawifi" target="_blank" rel="noopener noreferrer">
          <b>Vibra Wifi</b>
        </a>
        {` `}
        with
        {` `}
        <a href="https://twitter.com/vicman_ve" target="_blank" rel="noopener noreferrer">
          <b>Victor Velasquez</b>
        </a>
      </p>
    </div>
  </footer>
)

export default Footer
