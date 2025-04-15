import { add, exportedForTesting } from '../src/string-calculator';

describe('Add numbers', () => {
  it('should return 0 for empty string', () => {
    expect(add('')).toBe(0);
  });

  it('should return the number if string has only one number', () => {
    expect(add('2')).toBe(2);
    expect(add('12')).toBe(12);
  });

  it('should return the sum of numbers separated by (,) in the string', () => {
    expect(add('2,5')).toBe(7);
    expect(add('12,20,10')).toBe(42);
    expect(add('2,8,3,7,4,6,5,5')).toBe(40);
  });

  it('should return the sum of numbers separated by (,) or (\n) in the string', () => {
    expect(add('2\n5')).toBe(7);
    expect(add('12\n20,10')).toBe(42);
    expect(add('2,8,3\n7,4,6\n5,5')).toBe(40);
  });

  it('should identify the delimiter and return the sum of numbers separated by that delimiter', () => {
    expect(add('//;\n2;5')).toBe(7);
    expect(add('//:\n12:20:10')).toBe(42);
  });

  it('should be able to handle special character delimiters', () => {
    expect(add('//$\n2$8$3$7$4$6$5$5')).toBe(40);
    expect(add('//*\n2*8*3*7*4*8')).toBe(32);
  });

  it('should throw an error with all negative numbers in the string included in the error message', () => {
    expect(() => add('-2,1,5,-8')).toThrow('negative numbers not allowed -2,-8');
    expect(() => add('-2,-4,-9')).toThrow('negative numbers not allowed -2,-4,-9');
  });
  
  it('should not add the numbers greater than 1000', () => {
    expect(add('2,5,1001')).toBe(7);
    expect(add('12,20,2022')).toBe(32);
  });

  it('should handle delimiters of any length and return the sum of numbers separated by that delimiter', () => {
    expect(add('//;;\n2;;5')).toBe(7);
    expect(add('//***\n12***20***10')).toBe(42);
  });
});

describe('getDelimiter', () => {
  it('should return empty string for empty string input', () => {
    expect(exportedForTesting.getDelimiter('')).toBe('');
  });

  it('should return the character that is enclosed within "//" and "\n"', () => {
    expect(exportedForTesting.getDelimiter('//;\n1;2')).toBe(';');
    expect(exportedForTesting.getDelimiter('//*:\n1*:2')).toBe('*:');
  });
});

describe('sanitizeDelimiters', () => {
  it('should return empty string for empty string input', () => {
    expect(exportedForTesting.sanitizeDelimiters('')).toBe('');
  });

  it('should return special characters with "\\" as prefix', () => {
    expect(exportedForTesting.sanitizeDelimiters('**')).toBe('\\*\\*');
    expect(exportedForTesting.sanitizeDelimiters('$$')).toBe('\\$\\$');
  });
});

describe('getAllNegativeNumbers', () => {
  it('should return empty array for empty array', () => {
    expect(exportedForTesting.getAllNegativeNumbers([])).toEqual([]);
  });

  it('should return empty array for non-negative numbers in an array', () => {
    expect(exportedForTesting.getAllNegativeNumbers([1, 2])).toEqual([]);
    expect(exportedForTesting.getAllNegativeNumbers([22, 28, 19])).toEqual([]);
  });

  it('should return array of all negative numbers present in an array of numbers', () => {
    expect(exportedForTesting.getAllNegativeNumbers([1, 2, -4, 5])).toEqual([
      -4,
    ]);
    expect(exportedForTesting.getAllNegativeNumbers([-1, -2, -4])).toEqual([
      -1, -2, -4,
    ]);
    expect(
      exportedForTesting.getAllNegativeNumbers([-1, 3, -2, 5, -4, 8])
    ).toEqual([-1, -2, -4]);
  });
});
