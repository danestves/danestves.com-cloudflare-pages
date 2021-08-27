export const SearchIcon = (
  props: React.SVGProps<SVGSVGElement>
): JSX.Element => {
  return (
    <svg
      fill="none"
      height="1em"
      viewBox="0 0 23 23"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.009 22.01l-4.826-4.835 4.826 4.835zm-2.151-11.295a9.144 9.144 0 11-18.288 0 9.144 9.144 0 0118.288 0v0z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.579}
      />
    </svg>
  )
}

export default SearchIcon
