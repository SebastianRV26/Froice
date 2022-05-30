exports.arrayLeftOuterJoin = (array1, array2) => {
  if (!array1) {
    if (!array2) {
      return [];
    }
    return array2;
  }
  if (!array2) {
    return [];
  }

  let map = {};
  for (let i = 0; i < array1.length; i++) {
    map[array1[i]] = 1;
  }
  let result = [];
  for (let i = 0; i < array2.length; i++) {
    if (!(array2[i] in map)) {
      result.push(array2[i]);
    }
  }
  return result;
};

const dict = "ABCDEFGHIJKLMNOPQRSTUVabcdefghijklmnopqrstuvwxyz0123456789";
const maxLength = 28;

exports.generateKey = (val) => {
  let result = [];
  for (let i = 0; i < val.length; i++) {
    if (i < maxLength) {
      result[i] = dict[val.charCodeAt(i) % maxLength];
    } else {
      result[i % maxLength] =
        dict[
          (result[i % maxLength].charCodeAt(0) + val.charCodeAt(i)) % maxLength
        ];
    }
  }

  return result.join("");
};
