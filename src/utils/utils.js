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

export const resizeImage = (settings) => {
  var file = settings.file;
  var maxSize = settings.maxSize;
  var reader = new FileReader();
  var image = new Image();
  var canvas = document.createElement("canvas");
  var dataURItoBlob = function (dataURI) {
    var bytes =
      dataURI.split(",")[0].indexOf("base64") >= 0
        ? atob(dataURI.split(",")[1])
        : unescape(dataURI.split(",")[1]);
    var mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var max = bytes.length;
    var ia = new Uint8Array(max);
    for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
    return new Blob([ia], { type: mime });
  };
  var resize = function () {
    var width = image.width;
    var height = image.height;
    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else {
      if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }
    }
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    var dataUrl = canvas.toDataURL("image/jpeg");
    return dataURItoBlob(dataUrl);
  };
  return new Promise(function (ok, no) {
    if (!file.type.match(/image.*/)) {
      no(new Error("Not an image"));
      return;
    }
    reader.onload = function (readerEvent) {
      image.onload = function () {
        return ok(resize());
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  });
};

export const getFriendlyTime = (dateToConvert) => {
  const currentDate = new Date();
  const secondsDiff = (currentDate.getTime() - dateToConvert.getTime()) / 1000;
  if (secondsDiff < 60) {
    return "Hace unos segundos";
  }
  if (secondsDiff < 3600) {
    return `Hace ${Math.floor(secondsDiff / 60)} minutos`;
  }
  if (secondsDiff < 86400) {
    return `Hace ${Math.floor(secondsDiff / 3600)} horas`;
  }
  return dateToConvert.toDateString();
};

export const votesToString = (votes) => {
  if (votes > -1000 && votes < 1000) {
    return votes.toString();
  }
  if (votes > -1_000_000 && votes < 1_000_000) {
    return `${(votes / 1000).toFixed(1)}K`;
  }
  return `${(votes / 1_000_000).toFixed(1)}M`;
};
