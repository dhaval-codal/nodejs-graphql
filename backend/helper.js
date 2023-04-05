import CryptoJS from "crypto-js";
import env from 'dotenv';
env.config()
const secretPassphrase = process.env.SECRET_PASS_PHRASE;

export const encryptKey = string_ => {
    return CryptoJS.AES.encrypt(string_, secretPassphrase).toString();
};

export const decryptKey = string_ => {
    const decodedString = decodeURIComponent(string_);
    return CryptoJS.AES.decrypt(decodedString, secretPassphrase).toString(CryptoJS.enc.Utf8);
};