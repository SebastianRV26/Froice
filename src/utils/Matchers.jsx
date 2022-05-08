export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
export const validateCapitalLetter = new RegExp('^(.*[A-Z].*)$');
export const validateLowercaseLetter = new RegExp('^(.*[a-z].*)$');
export const emailIsValid = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$"
