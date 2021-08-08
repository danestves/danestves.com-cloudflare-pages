/**
 * Returns if a target string contains any of the words of the pattern
 *
 * @param target The string to analyze
 * @param pattern The array of words for regex
 */
export const contains = (target: string, pattern: string[]): boolean => {
  const value = new RegExp(pattern.join('|')).test(target)

  return value
}
