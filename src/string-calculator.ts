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

  const numbers: Array<number> = numbersString
    .split(delimiterRegEx)
    .map((num) => Number(num));

  const negativeNumbers = getAllNegativeNumbers(numbers);

  if (negativeNumbers.length) {
    throw Error(`negative numbers not allowed ${negativeNumbers.join(',')}`);
  }

  return numbers.reduce((acc, num) => {
    if (num <= 1000) return acc + num;
    return acc;
  }, 0);
};

export const exportedForTesting = {
  getDelimiter,
  sanitizeDelimiters,
  getAllNegativeNumbers,
};
