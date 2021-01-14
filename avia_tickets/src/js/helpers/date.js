import { format } from 'date-fns';
/**
 *
 * @param {String} str - new Date at string format
 * @param {String} type - date format as need
 */
export function formatDate(str, type) {
  const date = new Date(str);

  return format(date, type);
}
