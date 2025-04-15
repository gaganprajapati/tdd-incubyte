export const add = (numbersString: string): number => {
    return numbersString.split(',').reduce((acc, num) => acc + Number(num), 0)
}