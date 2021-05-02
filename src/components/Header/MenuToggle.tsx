const MenuToggle = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean
  toggle: (arg0: boolean) => void
}): JSX.Element => (
  <button
    type="button"
    className="absolute flex items-center justify-center w-12 h-12 p-2 rounded-full z-[100] top-5 right-4 focus:outline-none focus:ring-2 focus:ring-primary"
    onClick={() => toggle(!isOpen)}
    aria-label="Open/Close Menu"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-5 h-5"
    >
      {isOpen ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  </button>
)

export default MenuToggle
