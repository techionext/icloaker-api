import moment from 'moment';

interface IFormatDateDynamic {
  month: number;
}

export const FormatDateDynamic = ({ month }: IFormatDateDynamic) => {
  const dateCurrency = moment();
  const dateLast = dateCurrency.subtract(month, 'months');

  return dateLast.format('YYYY-MM-DD');
};
