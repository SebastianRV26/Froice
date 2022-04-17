const CryptoJS = require("crypto-js");
const secretKey = "secretoken";
// Encrypt
module.exports.encrypt = (password) =>{
    return CryptoJS.AES.encrypt(password, secretKey).toString();
}

module.exports.decrypt = (password) =>{
    let bytes  = CryptoJS.AES.decrypt(password, secretKey);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}
