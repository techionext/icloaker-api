/**
 * @expected 'richard_madrigar@hotmail.com'
 * @Output true
 * ----
 * @expected 'richardhotmailcom'
 * @Output false
 */

export const HandleIsValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const emailFormat = email.trim();
  const isValid = emailRegex.test(emailFormat);

  return isValid;
};
