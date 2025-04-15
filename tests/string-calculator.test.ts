import { add } from "../src/string-calculator"

describe('Add numbers', () => {
    it('should return 0 for empty string', () => {
        expect(add('')).toBe(0)
    })
})