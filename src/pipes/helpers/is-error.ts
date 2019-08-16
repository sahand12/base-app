export function isError(value: any): boolean {
  return value instanceof Error && typeof value.message !== 'undefined';
}
