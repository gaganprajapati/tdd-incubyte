const getDelimiter = (numbersString: string): string => {
  const match = numbersString.match(/\/\/(.*?)\n/);
  return match?.length ? match[1] : '';
};

export const add = (numbersString: string): number => {
  let delimiterRegEx = /[,\n]/;
  if (numbersString.startsWith('//')) {
    delimiterRegEx = new RegExp(getDelimiter(numbersString));
  }
  return numbersString
    .split(delimiterRegEx)
    .reduce((acc, num) => acc + Number(num), 0);
};

export const exportedForTesting = {
  getDelimiter,
};
