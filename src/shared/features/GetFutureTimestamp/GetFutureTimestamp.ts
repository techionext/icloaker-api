import moment from 'moment';

interface IGetFutureTimestamp {
  amount: string;
  unit: moment.unitOfTime.DurationConstructor;
}
/**
 * @param amount: 30
 * @param unit: 'minutes'
 * @returns CurrentDate + 30 minutes
 *
 * @param amount: 1
 * @param unit: 'day'
 * @returns CurrentDate + 1 day
 */

export function GetFutureTimestamp({ amount, unit }: IGetFutureTimestamp): string {
  const date = moment();

  const timestampWithDelay = moment(date).add(amount, unit).format('YYYY-MM-DD HH:mm:ss');

  return timestampWithDelay;
}
