export function defaultKeyIdExtractor<T extends {id: string | number}>(
  item: T,
): string {
  return ((item as any)?._id ?? item?.id ?? '').toString();
}
