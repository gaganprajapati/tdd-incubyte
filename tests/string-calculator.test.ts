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
