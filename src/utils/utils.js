export const firstWordToLowerCase = (value) => {
  const firstWord = value.split(" ", 1)[0].toLowerCase();
  return firstWord + value.slice(firstWord.length);
};

export const objectFirstWordToLowerCase = (object) => {
  let newObject = {};
  for (const keyValue in object) {
    newObject[keyValue] = firstWordToLowerCase(object[keyValue]);
  }
  return newObject;
};

export const objectFirstLetterToUpperCase = (object) => {
  let newObject = {};
  for (const keyValue in object) {
    newObject[keyValue] = capitalizeFirstLetter(object[keyValue]);
  }
  return newObject;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
