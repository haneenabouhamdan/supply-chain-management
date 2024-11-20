import { get, isArray, isEqual, uniqWith } from 'lodash';

export function arrayLens<T, K extends KeyPaths<T>>(records: T[], key: K) {
  return records.map((record) => get(record, key));
}

export const asArray = <T>(value: T | T[]) =>
  isArray(value) ? value : [value];

export const isTruthy = <T>(value: T): boolean | T => !!value;

export function recordsToMapAsArray<T, K extends keyof T>(
  array: Array<T>,
  keyName: K,
) {
  const map = new Map<T[K], T[]>();
  array.forEach((record) => {
    const key = record[keyName];
    const value = map.get(key);
    if (value) map.set(key, [...value, record]);
    else map.set(key, [record]);
  });
  return map;
}

export function recordsToMapAsObject<T, K extends keyof T>(
  array: Array<T>,
  keyName: K,
): Map<T[K], T> {
  const map = new Map<T[K], T>();
  array.forEach((record) => {
    const key = record[keyName];
    map.set(key, record);
  });
  return map;
}

type KeyPaths<T, Prefix extends string = ''> = {
  [K in keyof T]: K extends string
    ?
        | `${Prefix & string}${K & string}`
        | `${Prefix & string}${KeyPaths<T[K], `${K & string}.`>}`
    : never;
}[keyof T];

export function getObjectsArrayValues<T, K extends keyof T>(
  array: Array<T>,
  paths: Array<K>,
) {
  const pathValuesMap = new Map();
  paths.forEach((path) => {
    pathValuesMap.set(path, []);
  });
  array.forEach((object) => {
    paths.forEach((path) => {
      const pathValues = pathValuesMap.get(path);
      const value = get(object, path);
      if (typeof value !== 'undefined') {
        pathValues.push(value);
      }
      pathValuesMap.set(path, unique(pathValues));
    });
  });
  return pathValuesMap;
}

export function unique<T>(array: Array<T>) {
  return [...new Set(array)];
}

export function uniqueObjects<T>(array: Array<T>) {
  return uniqWith(array, isEqual);
}

export function stringToLower(val?: string) {
  if (!val) return;
  return val.split(' ').join('').toLowerCase();
}

export function removeEmojis(text: string) {
  return text
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      '',
    )
    .replace(/\s+/g, ' ')
    .trim();
}
