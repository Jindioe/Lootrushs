export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 4.5 42 14.5v19L24 43.5 6 33.5v-19L24 4.5Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M24 4.5v39" stroke="currentColor" strokeWidth="2.2" />
      <path d="M6 14.5 24 24.5 42 14.5" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="24" cy="24.5" r="3.4" fill="currentColor" />
    </svg>
  );
}
