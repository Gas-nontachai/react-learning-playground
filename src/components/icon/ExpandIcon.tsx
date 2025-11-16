import type {SVGProps} from 'react';

type ExpandIconProps = SVGProps<SVGSVGElement>;

export function ExpandIcon({className, ...props}: ExpandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15.5 3.5h5v5" />
      <path d="M21 3l-6 6" />
      <path d="M8.5 20.5h-5v-5" />
      <path d="M3 21l6-6" />
    </svg>
  );
}
