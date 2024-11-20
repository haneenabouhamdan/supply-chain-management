import { padStart } from 'lodash';
import * as moment from 'moment-timezone';
import { DATE_COMPARISON_FUNCTIONS } from '../constants';
import { CompareOperators, Days, Timezones } from '../types';

const isValidDate = (date: string | Date) => {
  return new Date(date) instanceof Date;
};

const isValidTime = (time: Time) => {
  if (time.split(':').length < 2) return false;
  const falsyParts = time
    .split(':')
    .filter((timePart) => Number.isNaN(timePart));
  return !falsyParts.length;
};

export const getToday = () => {
  const todayIndex = new Date().getDay();
  return Object.values(Days)[todayIndex];
};

export const getDatesOffsetInDays = (
  date1: string | Date,
  date2: string | Date,
  timezone = Timezones.utc,
) => {
  if (!isValidDate(date1) || !isValidDate(date2))
    throw new Error('Invalid dates');

  timezone = timezone ?? Timezones.utc;

  const day1Start = moment(date1).tz(timezone).startOf('day');
  const day2Start = moment(date2).tz(timezone).startOf('day');

  const diff = Math.abs(moment(day1Start).diff(day2Start, 'days'));

  const isSameDay = moment(date1).isSame(date2, 'day');

  // moment calculates differences between days based on 24 hours difference.
  // so the below condition is required to check the case if it's tomorrow and difference less than 24 hours
  return !isSameDay && !diff ? 1 : diff;
};

export const getDatesDiffInSec = (date1: string, date2: string) => {
  if (!isValidDate(date1) || !isValidDate(date2))
    throw new Error('Invalid dates');
  return Math.abs(moment(date1).diff(date2, 'second'));
};

export const constructDate = (
  date: string | Date,
  {
    extraHours = 0,
    extraMinutes = 0,
    extraDays = 0,
    timezone = Timezones.utc,
  } = {},
) => {
  if (!isValidDate(date)) throw new Error('Invalid date');

  timezone = timezone ?? Timezones.utc;

  return moment(date)
    .tz(timezone)
    .add(extraMinutes, 'minutes')
    .add(extraHours, 'hours')
    .add(extraDays, 'days')
    .format();
};

export const getDayIndex = (day: Days) => {
  return Object.values(Days).indexOf(day);
};

export const getDaysOffsetInWeek = (day1: Days, day2: Days) => {
  const day1Index = getDayIndex(day1);
  const day2Index = getDayIndex(day2);

  if (day1Index < 0 || day2Index < 0) throw new Error('Invalid days');

  const day1Date = getDayNextDate(day1Index);
  const day2Date = getDayNextDate(day2Index);

  return getDatesOffsetInDays(day1Date, day2Date);
};

const getDayNextDate = (dayIndex: number) => {
  const nowDayIndex = moment().isoWeekday();

  if (nowDayIndex <= dayIndex) return moment().isoWeekday(dayIndex).format();
  else return moment().add(1, 'weeks').isoWeekday(dayIndex).format();
};

export const timify = (time: Time) => {
  if (!isValidTime(time)) throw new Error('Invalid time string');

  const [sentHours, sentMinutes, sentSeconds = '00'] = time.split(':');

  const hours = padStart(sentHours, 2, '0');
  const minutes = padStart(sentMinutes, 2, '0');
  const seconds = padStart(sentSeconds, 2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

export const fromDateToTime = ({
  timezone = Timezones.utc,
  date = createZonedDate({ timezone }),
} = {}) => {
  if (!isValidDate(date)) throw new Error('Invalid date');

  timezone = timezone ?? Timezones.utc;
  date = date ?? createZonedDate({ timezone });

  const time = moment(date).tz(timezone).format('HH:mm:ss');

  const [hours, minutes, seconds] = time.split(':');

  return `${padStart(hours, 2, '0')}:${padStart(minutes, 2, '0')}:${padStart(
    seconds,
    2,
    '0',
  )}` as Time;
};

export const fromTimeToDate = ({
  time,
  offsetDays = 0,
  timezone = Timezones.utc,
}: {
  time: Time;
  offsetDays?: number;
  timezone?: Timezones;
}) => {
  if (!isValidTime(time)) throw new Error('Invalid time');

  timezone = timezone ?? Timezones.utc;
  offsetDays = offsetDays ?? 0;

  const [hours, minutes] = time.split(':');
  const startOfDay = moment(createZonedDate({ timezone }))
    .tz(timezone)
    .startOf('day')
    .format();
  return constructDate(startOfDay, {
    extraDays: offsetDays,
    extraHours: Number(hours),
    extraMinutes: Number(minutes),
    timezone,
  });
};

export const shiftDayTime = ({
  time,
  date,
  timezone,
  beautifyResult,
}: {
  time: Time;
  date?: string | Date;
  timezone?: Timezones;
  beautifyResult?: boolean;
}): string => {
  timezone = timezone ?? Timezones.utc;
  date = date ?? createZonedDate({ timezone });

  const [hours, minutes] = time.split(':');
  const startOfDay = moment(date).tz(timezone).startOf('day').format();

  const resultDate = constructDate(startOfDay, {
    extraHours: Number(hours),
    extraMinutes: Number(minutes),
    timezone,
  });
  return beautifyResult ? prettyDate(resultDate) : resultDate;
};

export const compareTime = (
  time1: Time,
  operator: CompareOperators,
  time2: Time,
) => {
  if (!DATE_COMPARISON_FUNCTIONS[operator])
    throw new Error('Invalid comparison operator');

  const date1 = new Date(fromTimeToDate({ time: time1 }));
  const date2 = new Date(fromTimeToDate({ time: time2 }));

  return DATE_COMPARISON_FUNCTIONS[operator](date1, date2);
};

export const compareDate = (
  date1: string | Date,
  operator: CompareOperators,
  date2: string | Date,
) => {
  if (!isValidDate(date1) || !isValidDate(date2))
    throw new Error('date not valid');

  if (!DATE_COMPARISON_FUNCTIONS[operator])
    throw new Error('Invalid comparison operator');

  return DATE_COMPARISON_FUNCTIONS[operator](new Date(date1), new Date(date2));
};

export const between2Dates = (
  date: string | Date,
  lowerDate: string | Date,
  upperDate: string | Date,
) => {
  if (!isValidDate(date) || !isValidDate(lowerDate) || !isValidDate(upperDate))
    throw new Error('date not valid');

  return (
    DATE_COMPARISON_FUNCTIONS[CompareOperators.gte](
      new Date(date),
      new Date(lowerDate),
    ) &&
    DATE_COMPARISON_FUNCTIONS[CompareOperators.lt](
      new Date(date),
      new Date(upperDate),
    )
  );
};

export const createZonedDate = ({
  timezone = Timezones.utc,
  date = moment().tz(timezone),
  beautifyResult = false,
}: {
  timezone?: Timezones;
  date?: moment.Moment | Date | string;
  beautifyResult?: boolean;
} = {}) => {
  timezone = timezone ?? Timezones.utc;
  date = date ?? moment().tz(timezone);

  const zonedDate = moment(date).tz(timezone).format();

  return beautifyResult ? prettyDate(zonedDate) : zonedDate;
};

export const startOfDay = (date: Date | string, timezone = Timezones.utc) =>
  moment(date).tz(timezone).startOf('day');
export const endOfDay = (date: Date | string, timezone = Timezones.utc) =>
  moment(date).tz(timezone).endOf('day');

export const extractDate = (date: string) => {
  const [dateOnly] = date?.split('T');
  return dateOnly;
};

export const splitDate = ({
  timezone = Timezones.utc,
  date,
}: {
  date: moment.Moment;
  timezone: Timezones;
}) => {
  const zonedDate = createZonedDate({ date, timezone });

  const [dateOnly, time] = zonedDate.split('T');

  const [timeOnly] = time.replace('+', '*').replace('-', '*').split('*');

  return {
    date: dateOnly,
    time: timeOnly,
  };
};

export const prettyDate = (date: string) => {
  const [dateOnly, time] = date.split('T');

  const [timeOnly] = time
    .replace('Z', '')
    .replace('+', '*')
    .replace('-', '*')
    .split('*');

  return `${dateOnly} ${timify(timeOnly as Time)}`;
};

export const extractTime = (date: string, timezone?: Timezones) => {
  const zonedDate = timezone ? createZonedDate({ timezone, date }) : date;
  const [dateOnly, time] = zonedDate.split('T');

  const [timeOnly] = time
    .replace('Z', '')
    .replace('+', '*')
    .replace('-', '*')
    .split('*');

  return { time: timeOnly as Time, date: new Date(dateOnly) };
};

export const convertToUTCDate = (date: string, stringify = false) =>
  stringify
    ? moment(date).tz(Timezones.utc).format()
    : moment(date).tz(Timezones.utc).toDate();

export const parseUTCDate = (date: string | Date, timezone: Timezones) => {
  const dateInTimeZone = moment(date).tz(timezone);
  return dateInTimeZone.toDate();
};

export const parseUTCTime = (time: string, timezone: Timezones) => {
  const dateInTimeZone = moment.tz(timezone);
  const dateWithTime = dateInTimeZone.set({
    hour: Number(time.split(':')[0]),
    minute: Number(time.split(':')[1]),
    second: 0,
    millisecond: 0,
  });

  const utcDate = dateWithTime.utc();
  return utcDate.format('HH:mm') as Time;
};

export function getFutureDateInSeconds(minutes: number): number {
  const currentTimeInSeconds = dateToSeconds(new Date());
  return currentTimeInSeconds + minutes * 60;
}

export function dateToSeconds(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

export function getUTCDate() {
  const date = new Date();
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds(),
  );
}

//export const timestampFormatter = (date: string) => prettyDate(convertToUTCDate(date).toISOString());
