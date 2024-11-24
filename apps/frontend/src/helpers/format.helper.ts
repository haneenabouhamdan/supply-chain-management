export function recordsToMapAsObject<T, K extends keyof T>(
  array: Array<T>,
  keyName: K
): Map<T[K], T> {
  const map = new Map<T[K], T>();
  array.forEach(record => {
    const key = record[keyName];
    map.set(key, record);
  });
  return map;
}
