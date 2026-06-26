/** Public asset path prefix for Next.js static files. */
export function publicUrl(path: string): string {
  return `/${path.replace(/^\//, '')}`;
}
