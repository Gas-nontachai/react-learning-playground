import type {SVGProps} from 'react';

type SpeakerIconProps = SVGProps<SVGSVGElement>;

export function SpeakerIcon({className, ...props}: SpeakerIconProps) {
  const classes = ['h-5 w-5', className].filter(Boolean).join(' ');

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={classes}
      {...props}
    >
      <path d="M11 5 6 9H3v6h3l5 4z" />
      <path d="M20 8a5 5 0 0 1 0 8" />
      <path d="M16 10a3 3 0 0 1 0 4" />
    </svg>
  );
}
