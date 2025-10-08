import CryptoJS from "crypto-js";

export const encryptData = (data, secret) => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
  } catch (err) {
    console.error("Encryption failed:", err);
    return "";
  }
};

export const decryptData = (cipher, secret) => {
  if (!cipher) return "";
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, secret);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted ? JSON.parse(decrypted) : "";
  } catch (err) {
    console.error("Decryption failed:", err);
    return "";
  }
};
