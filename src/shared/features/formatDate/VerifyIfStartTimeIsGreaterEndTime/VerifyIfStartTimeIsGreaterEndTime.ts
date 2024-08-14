import Moment from 'moment';

interface IVerifyIfStartTimeIsGreaterEndTime {
  startTime: string;
  endTime: string;
}
// expected: => start: 10:00 and end: '09:59'  error: true --- 10:00 and 12:20 false
export const VerifyIfStartTimeIsGreaterEndTime = ({ endTime, startTime }: IVerifyIfStartTimeIsGreaterEndTime) => {
  const hoursInicial = Moment(endTime, 'HH:mm');
  const hoursFinal = Moment(startTime, 'HH:mm');

  const isValid = hoursFinal.isAfter(hoursInicial);
  return isValid;
};
