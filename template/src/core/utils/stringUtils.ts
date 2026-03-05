/**
 * Safely converts any value to a string.
 * Useful for error messages that might be objects.
 */
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
