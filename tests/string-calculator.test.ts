import { add } from "../src/string-calculator"

describe('Add numbers', () => {
    it('should return 0 for empty string', () => {
        expect(add('')).toBe(0)
    });

    it('should return the number if string has only one number', () => {
        expect(add('2')).toBe(2);
        expect(add('12')).toBe(12);
    })
})