export const add = (numbersString: string): number => {
    return numbersString.split(/[,\n]/).reduce((acc, num) => acc + Number(num), 0)
}