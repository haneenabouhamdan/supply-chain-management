import moment from "moment";

export function formatDate(date: Date, format: string = "YYYY-MM-DD"): string {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date object");
  }

  return moment(date).format(format);
}
