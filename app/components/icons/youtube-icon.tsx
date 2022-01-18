function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      height="1em"
      viewBox="0 0 33 23"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)">
        <path
          d="M32.27 3.587a4.103 4.103 0 00-1.07-1.833A4.157 4.157 0 0029.35.692C26.79 0 16.483 0 16.483 0S6.176.021 3.615.713c-.7.188-1.337.554-1.85 1.062a4.104 4.104 0 00-1.07 1.833C-.08 8.118-.38 14.991.715 19.321c.19.694.56 1.326 1.072 1.834s1.15.874 1.85 1.061c2.56.693 12.867.693 12.867.693s10.307 0 12.867-.693a4.156 4.156 0 001.85-1.061 4.104 4.104 0 001.071-1.834c.817-4.516 1.069-11.385-.021-15.734z"
          fill="red"
        />
        <path d="M13.203 16.363l8.55-4.909-8.55-4.909v9.818z" fill="#fff" />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path d="M0 0h33v23H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

export { YoutubeIcon };
