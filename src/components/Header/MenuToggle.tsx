const MenuToggle = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean
  toggle: (arg0: boolean) => void
}): JSX.Element => (
  <button
    aria-label="Open/Close Menu"
    className="absolute flex items-center justify-center text-secondary-500 w-12 h-12 p-2 rounded-full z-[100] top-2 right-4 focus:outline-none focus:ring-2 focus:ring-primary"
    onClick={() => toggle(!isOpen)}
    type="button"
  >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isOpen ? (
        <path
          d="M6 18L18 6M6 6l12 12"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      ) : (
        <path
          d="M4 6h16M4 12h16M4 18h16"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      )}
    </svg>
  </button>
)

export default MenuToggle
