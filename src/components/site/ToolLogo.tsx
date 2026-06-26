import { cn } from '@/lib/utils';

interface ToolLogoProps {
  id: string;
  className?: string;
  wide?: boolean;
}

export function ToolLogo({ id, className, wide }: ToolLogoProps) {
  const common = cn(
    'block shrink-0',
    wide ? 'h-[18px] w-auto max-w-[14px]' : 'h-[18px] w-[18px]',
    className,
  );

  switch (id) {
    case 'figma':
      return (
        <svg className={cn(common, 'max-w-[12px]')} viewBox="0 0 38 57" aria-hidden>
          <path d="M13.333 80C20.693 80 26.667 74.027 26.667 66.667V53.333H13.333C5.973 53.333 0 59.307 0 66.667C0 74.027 5.973 80 13.333 80Z" fill="#0ACF83" />
          <path d="M0 40C0 32.64 5.973 26.667 13.333 26.667H26.667V53.333H13.333C5.973 53.333 0 47.36 0 40Z" fill="#A259FF" />
          <path d="M0 13.333C0 5.973 5.973 0 13.333 0H26.667V26.667H13.333C5.973 26.667 0 20.693 0 13.333Z" fill="#F24E1E" />
          <path d="M26.667 0H40C47.36 0 53.333 5.973 53.333 13.333C53.333 20.693 47.36 26.667 40 26.667H26.667V0Z" fill="#FF7262" />
          <path d="M53.333 40C53.333 47.36 47.36 53.333 40 53.333C32.64 53.333 26.667 47.36 26.667 40C26.667 32.64 32.64 26.667 40 26.667C47.36 26.667 53.333 32.64 53.333 40Z" fill="#1ABCFE" />
        </svg>
      );
    case 'cursor':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#E8EAED"
            d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23"
          />
        </svg>
      );
    case 'mixpanel':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <circle cx="7.5" cy="8" r="2.75" fill="#7856FF" />
          <circle cx="16.5" cy="8" r="2.75" fill="#7856FF" />
          <circle cx="12" cy="16.5" r="2.75" fill="#7856FF" />
        </svg>
      );
    case 'flash':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <rect width="24" height="24" rx="5" fill="#850023" />
          <path d="M14.2 4.5H9.1l4.6 6.4H8.5L6 19.5h5.1l-4.4-6.2h5.1l2.5-8.8z" fill="#fff" />
        </svg>
      );
    case 'photoshop':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <rect width="24" height="24" rx="5" fill="#001E36" />
          <path
            d="M8.2 16.1c-1.55 0-2.55-.95-2.55-2.45 0-1.65 1.15-2.35 3.05-2.65l1.25-.2c.55-.1.75-.25.75-.55 0-.35-.35-.55-.95-.55-.75 0-1.2.3-1.35.85H6.4c.2-1.55 1.45-2.55 3.45-2.55 2.05 0 3.35 1 3.35 2.55 0 1.55-1.05 2.35-2.95 2.65l-1.25.2c-.55.1-.75.25-.75.55 0 .35.35.55.95.55.8 0 1.25-.35 1.4-.95h1.75c-.15 1.55-1.35 2.55-3.25 2.55zm6.55-5.55c.95 0 1.55.45 1.85 1.15l.05-.95h1.55v6.35h-1.55v-3.35c0-.85-.45-1.35-1.2-1.35-.7 0-1.15.45-1.15 1.25v3.45h-1.55V7.9h1.55v.95c.3-.65.9-1.3 1.55-1.3z"
            fill="#31A8FF"
          />
        </svg>
      );
    case 'sketch':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#FDB300"
            d="M12 1.25 5.25 8.25v7.5L12 22.75l6.75-7V8.25L12 1.25zm0 2.08 5.38 3.42v5.17L12 19.9l-5.38-3.42V6.75L12 3.33z"
          />
        </svg>
      );
    case 'invision':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <rect width="24" height="24" rx="6" fill="#FF3366" />
          <path
            d="M8.2 16.5V7.5h1.65v3.35c0 .95.45 1.45 1.25 1.45.75 0 1.15-.45 1.15-1.25V7.5H13.9v4.05c0 2.05-1.1 3.15-2.85 3.15-1.75 0-2.85-1.1-2.85-3.15z"
            fill="#fff"
          />
        </svg>
      );
    case 'storybook':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#FF4785"
            d="M16.71.243l-.12 2.71a.18.18 0 0 0 .29.15l1.06-.8.9.7a.18.18 0 0 0 .28-.14l-.1-2.76 1.33-.1a1.2 1.2 0 0 1 1.279 1.2v21.596a1.2 1.2 0 0 1-1.26 1.2l-16.096-.72a1.2 1.2 0 0 1-1.15-1.16l-.75-19.797a1.2 1.2 0 0 1 1.13-1.27L16.7.222zM13.64 9.3c0 .47 3.16.24 3.59-.08 0-3.2-1.72-4.89-4.859-4.89-3.15 0-4.899 1.72-4.899 4.29 0 4.45 5.999 4.53 5.999 6.959 0 .7-.32 1.1-1.05 1.1-.96 0-1.35-.49-1.3-2.16 0-.36-3.649-.48-3.769 0-.27 4.03 2.23 5.2 5.099 5.2 2.79 0 4.969-1.49 4.969-4.18 0-4.77-6.099-4.64-6.099-6.999 0-.97.72-1.1 1.13-1.1.45 0 1.25.07 1.19 1.87z"
          />
        </svg>
      );
    case 'hotjar':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#FD3A69"
            d="M10.119 9.814C12.899 8.27 16.704 6.155 16.704 0h-4.609c0 3.444-1.676 4.375-4.214 5.786C5.1 7.33 1.295 9.444 1.295 15.6h4.61c0-3.444 1.676-4.376 4.214-5.786zM18.096 8.4c0 3.444-1.677 4.376-4.215 5.785-2.778 1.544-6.585 3.66-6.585 9.815h4.609c0-3.444 1.676-4.376 4.214-5.786 2.78-1.544 6.586-3.658 6.586-9.814h-4.609z"
          />
        </svg>
      );
    case 'surveys':
      return (
        <svg className={common} viewBox="0 0 24 24" aria-hidden>
          <rect
            x="4"
            y="2"
            width="16"
            height="20"
            rx="2.5"
            fill="none"
            stroke="#E8EAED"
            strokeWidth="1.75"
          />
          <path
            d="M8 8h8M8 12h8M8 16h5"
            stroke="#E8EAED"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <circle cx="17" cy="16" r="2.25" fill="#5EEAD4" />
          <path
            d="M16.1 16l.65.65 1.5-1.5"
            stroke="#001A17"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-[var(--x-line)] text-[0.5rem] font-mono uppercase text-[var(--x-ink-soft)]',
            common,
          )}
          aria-hidden
        >
          {id.slice(0, 2)}
        </span>
      );
  }
}
