import { add } from "../src/string-calculator"

describe('Add numbers', () => {
    it('should return 0 for empty string', () => {
        expect(add('')).toBe(0)
    });

    it('should return the number if string has only one number', () => {
        expect(add('2')).toBe(2);
        expect(add('12')).toBe(12);
    });

    it('should return the sum of numbers separated by (,) in the string', () => {
        expect(add('2, 5')).toBe(7);
        expect(add('12, 20, 10')).toBe(42);
        expect(add('2, 8, 3, 7, 4, 6, 5, 5')).toBe(40);
    });
})