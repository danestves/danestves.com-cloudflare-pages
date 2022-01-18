// Dependencies
import { format, formatDistanceToNow } from 'date-fns';
import es from 'date-fns/locale/es';

type FormatDateProps = {
  date: string | Date;
  formatter?: string;
  locale?: 'en' | 'es' | string;
};

/**
 * Format the received date using [date-fns](https://date-fns.org/)
 * that is a lightweight library to format dates
 *
 * @param date The date to format
 * @param formatter The way to format the date
 *
 * @returns The string with the formatted date
 */
const formatDate = ({
  date,
  formatter = 'mm/dd/yyyy',
  locale = 'en',
}: FormatDateProps): string => {
  return format(new Date(date), formatter, {
    locale: locale === 'es' ? es : undefined,
  });
};

type FromNowProps = {
  date: string | Date;
  locale?: 'en' | 'es' | string;
};

const fromNow = ({ date, locale = 'en' }: FromNowProps): string => {
  return formatDistanceToNow(new Date(date), {
    locale: locale === 'es' ? es : undefined,
    addSuffix: true,
  });
};

export { formatDate, fromNow };
export type { FormatDateProps, FromNowProps };
