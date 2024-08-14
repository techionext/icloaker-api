import moment from 'moment';

interface IVerifyDateHoursIsAfter {
  hour: string | Date;
}
/**
 * @description should return if data is greater than current data
 * @param date comparison : 2024-02-18 18:29:00.0000-03
 * @returns if now is after to param hour return true else false
 */

export function VerifyDateHoursIsAfter({ hour }: IVerifyDateHoursIsAfter): boolean {
  const now = moment();
  const isAfter = now.isAfter(moment(hour));

  return isAfter;
}
