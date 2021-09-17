export function OutlineArrowRight(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 7l5 5m0 0l-5 5m5-5H6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  )
}

export default OutlineArrowRight
