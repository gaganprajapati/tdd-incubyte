const getDelimiters = (numbersString: string): string => {
  const match = numbersString.match(/\/\/(.*?)\n/);
  return match?.length ? match[1] : '';
};

const sanitizeDelimiters = (delimiters: string): string => {
  return delimiters
    .replace(/[.*+?^${}()|\\]/g, '\\$&')
    .replaceAll('][', '|')
    .replace(/\[|\]/g, "");
};

const getAllNegativeNumbers = (numbers: Array<number>): Array<number> => {
  return numbers.filter((num) => num < 0);
};

export const add = (numbersString: string): number => {
  let delimiterRegEx: RegExp = /[,\n]/;
  if (numbersString.startsWith('//')) {
    const delimiter = sanitizeDelimiters(getDelimiters(numbersString));
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
  getDelimiters,
  sanitizeDelimiters,
  getAllNegativeNumbers,
};
