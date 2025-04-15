const getDelimiter = (numbersString: string): string => {
  const match = numbersString.match(/\/\/(.*?)\n/);
  return match?.length ? match[1] : '';
};

const sanitizeDelimiters = (delimiters: string): string => {
  return delimiters.replace(/[.*+?^${}()|\\]/g, '\\$&');
};

const getAllNegativeNumbers = (numbers: Array<number>) => {
  return numbers.filter((num) => num < 0);
};

export const add = (numbersString: string): number => {
  let delimiterRegEx = /[,\n]/;
  if (numbersString.startsWith('//')) {
    const delimiter = sanitizeDelimiters(getDelimiter(numbersString));
    delimiterRegEx = new RegExp(delimiter);
    numbersString = numbersString.split('\n')[1];
  }

  return numbersString
    .split(delimiterRegEx)
    .reduce((acc, num) => acc + Number(num), 0);
};

export const exportedForTesting = {
  getDelimiter,
  sanitizeDelimiters,
  getAllNegativeNumbers
};
