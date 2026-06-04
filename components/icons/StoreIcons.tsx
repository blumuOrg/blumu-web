type IconProps = {
  className?: string;
};

export function AppleIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export function PlayStoreIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#00D95F" d="M3 20.5V3.5C3 2.91 3.54 2.5 4 2.5c.19 0 .38.07.53.2l13.43 9.07-13.43 9.23c-.28.19-.66.19-.94 0-.15-.1-.53-.5-.53-1.5z" />
      <path fill="#FFBC00" d="M20.5 12 4 2.7v18.6L20.5 12z" opacity="0.9" />
      <path fill="#FF3A44" d="M4 2.5 20.5 12 4 21.5V2.5z" opacity="0.85" />
      <path fill="#1B73E8" d="M4 2.5 17.5 12 4 21.5 20.5 12 4 2.5z" opacity="0.7" />
    </svg>
  );
}
