function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      height="1em"
      viewBox="0 0 32 28"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M.6 3A2.2 2.2 0 012.8.8h26.4a2.2 2.2 0 110 4.4H2.8A2.2 2.2 0 01.6 3zM.6 14a2.2 2.2 0 012.2-2.2h26.4a2.2 2.2 0 110 4.4H2.8A2.2 2.2 0 01.6 14zM.6 25a2.2 2.2 0 012.2-2.2H16a2.2 2.2 0 110 4.4H2.8A2.2 2.2 0 01.6 25z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export { MenuIcon };
