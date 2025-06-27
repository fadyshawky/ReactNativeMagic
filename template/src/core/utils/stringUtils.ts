/**
 * Safely converts any value to a string
 * This is especially useful for error messages that might be objects
 */
import CryptoJS from 'crypto-js';

export const ensureString = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object') {
    try {
      // Try to extract a message property if it exists
      if (value.message && typeof value.message === 'string') {
        return value.message;
      }

      // Otherwise stringify the object
      return JSON.stringify(value);
    } catch (e) {
      return '[Object]';
    }
  }

  // For numbers, booleans, etc.
  return String(value);
};

export function decryptTripleDES(
  encryptedBase64: string,
  secretKeyBase64: string,
) {
  try {
    // Decode the key from base64
    const decodedKey = CryptoJS.enc.Base64.parse(secretKeyBase64);

    // Decode the encrypted value from base64
    const encryptedWordArray = CryptoJS.enc.Base64.parse(encryptedBase64);

    // Decrypt using Triple DES
    const decrypted = CryptoJS.TripleDES.decrypt(
      {ciphertext: encryptedWordArray},
      decodedKey,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      },
    );

    let decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) {
      throw new Error('Decryption resulted in empty string');
    }

    decryptedText = decryptedText.replace(/(.{4})/g, '$1-');
    if (decryptedText.endsWith('-')) {
      decryptedText = decryptedText.slice(0, -1);
    }

    return decryptedText;
  } catch (error) {
    throw new Error(`Decryption failed`);
  }
}

// Example usage:
// const decrypted = decryptBase64('encrypted_base64_string', 'your_secret_key');

/**
 * Converts a camelCase string to PascalCase with specific formatting
 * Example: billerId -> BillerId
 * @param str The camelCase string to convert
 * @returns The converted PascalCase string
 */
export const toPascalCase = (str: string): string => {
  if (!str) return '';

  // Split by capital letters and convert to array
  const words = str.split(/(?=[A-Z])/);

  // Capitalize first letter of each word and join
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

// Example usage:
// toPascalCase('billerId') => 'BillerId'
// toPascalCase('customerName') => 'CustomerName'
// toPascalCase('accountNumber') => 'AccountNumber'

/**
 * Converts a PascalCase string to camelCase
 * Example: BillerId -> billerId
 * @param str The PascalCase string to convert
 * @returns The converted camelCase string
 */
export const toCamelCase = (str: string): string => {
  if (!str) return '';

  // Convert first character to lowercase and keep the rest as is
  return str.charAt(0).toLowerCase() + str.slice(1);
};

// Example usage:
// toCamelCase('BillerId') => 'billerId'
// toCamelCase('CustomerName') => 'customerName'
// toCamelCase('AccountNumber') => 'accountNumber'
