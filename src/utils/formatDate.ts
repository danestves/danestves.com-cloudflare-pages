// Dependencies
import { format } from 'date-fns'
import es from 'date-fns/locale/es'

/**
 * @function formatDate
 *
 * @param date - The date to format
 * @param formatter - The way to format the date
 *
 * @returns The string with the formatted date
 */
const formatDate = (date: string | Date, formatter?: string): string => {
  return format(new Date(date), formatter || 'mm/dd/yyyy', {
    locale: es,
  })
}

export default formatDate
