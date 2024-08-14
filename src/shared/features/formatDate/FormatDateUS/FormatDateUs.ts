// expected => '03/08/2022' => 2022-08-03
export const FormatDateUS = (value: string): string => {
  const [day, month, year] = value.split('/');
  const resultDate = `${year}-${month}-${day}`;

  return resultDate;
};
