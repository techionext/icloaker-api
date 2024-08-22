/**
 *
 * @param dateString yyyy-mm-dd
 * @returns returns true if format is correct
 */

export function handleVerifyDateFormat(dateString: string): boolean {
  const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  console.log(regex.test(dateString));

  if (regex.test(dateString)) {
    return true;
  }

  return false;
}
