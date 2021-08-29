export function LinkOutIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      fill="none"
      height="1em"
      viewBox="0 0 18 17"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.25 7.25L16.5 1M12.333 1H16.5v4.167M16.5 10.167v4.166A1.666 1.666 0 0114.833 16H3.167A1.667 1.667 0 011.5 14.333V2.667A1.667 1.667 0 013.167 1h4.166"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.667}
      />
    </svg>
  )
}

export default LinkOutIcon
