import moment from 'moment';

/**
 * @returns Returns `true` if the current time is after the provided date.
 */

export function verifyNowIsAfter({ date, hours }: { date: string | Date; hours: number }) {
  const now = moment();
  const isAfter = now.isAfter(moment(date).add(hours, 'hours'));

  return isAfter;
}
