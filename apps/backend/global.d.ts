type UUID = string & { _uuidBrand: undefined };
type ID = UUID;
type Nullable<T> = T | null;
type Time =
  | `${number}${number}:${number}${number}`
  | `${number}${number}:${number}${number}:${number}${number}`;
