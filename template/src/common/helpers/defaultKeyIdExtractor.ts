export function defaultKeyIdExtractor<T extends {id: string | number}>(
  item: T,
): string {
  return item?._id;
}
