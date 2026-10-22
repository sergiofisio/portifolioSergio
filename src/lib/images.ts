export function isOptimizable(src: string) {
  return src.startsWith("/") && !src.startsWith("/uploads/");
}
