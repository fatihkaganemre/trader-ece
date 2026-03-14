// src/custom.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'tv-ticker-tape': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { symbols?: string }, HTMLElement>;
  }
}