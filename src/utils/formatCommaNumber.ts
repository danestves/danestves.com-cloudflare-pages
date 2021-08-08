/**
 * Format the given string (of number) or number to a readable format
 *
 * @param number The number to format
 * @returns The string formated
 */
export const formatCommaNumber = (number: number | string): string => {
  return new Intl.NumberFormat().format(Number(number))
}
