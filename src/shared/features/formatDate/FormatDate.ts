import moment from 'moment';

// expected: => String(New Date()) => 23/06/2022'
export const FormatDateBR = (value: string) => {
  const dateFormat = new Date(value).toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
  });
  return dateFormat;
};

// expected: => 2022-06-23
export const GetDateUSSemValue = () => {
  const momentDate = moment();
  const result = momentDate.utcOffset(-10800 / 60).format('YYYY-MM-DD');

  return result;
};

// expected: => 10:04:32
export const GetDateHoursBr = () => {
  const resultHors = new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date());

  return resultHors;
};

// expected => horsAtual: 14:40
export const GetHoursCurrency = () => {
  const momentDate = moment();
  const hoursAtual = momentDate.utcOffset(-10800 / 60).format('HH:mm');
  return hoursAtual;
};
