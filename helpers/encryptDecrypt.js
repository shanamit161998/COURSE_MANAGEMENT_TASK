// Encrypt with AES
const CryptoJS = require('crypto-js')
let secretKey = 'helloworld@123[]{}@@@@'
const encrypt = (data) => {
    try {
        // check for passed data error
        if (!data) throw new Error('Data required');

        // check if data is of Object
        if (typeof data === 'object') data = JSON.stringify(data);

        // encrypt
        const ciphertext = CryptoJS.AES.encrypt(data, secretKey);
        return ciphertext.toString();
    }
    catch (e) {
        logger.error(`encrypt function => Data = ${data} Error = `, e);
        throw e;
    }
}

// Decrypt with AES
const decrypt = (data) => {
    try {
        // check for passed data error
        if (!data) throw new Error('Data required');
        // decrypt
        const bytes = CryptoJS.AES.decrypt(data.toString(), secretKey);
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        return plaintext;
    }
    catch (e) {
        logger.error(`decrypt function => Data = ${data} Error = `, e);
        throw e;
    }
}

module.exports = { encrypt, decrypt }