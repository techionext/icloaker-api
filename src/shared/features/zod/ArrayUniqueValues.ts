export const zodUniqueValueInArray = (data: any[]) => {
  const unique = new Set(data.map((item) => JSON.stringify(item)));
  return unique.size === data.length;
};
