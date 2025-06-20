/**
 * Regex Validation Utility
 *
 * TypeScript utility for regex-based validation with custom error messages.
 */

// Types for validation result
export interface ValidationResult {
  isValid: boolean;
  message: string;
}

/**
 * Generic regex validation function
 * @param value - The string value to validate
 * @param regex - The regex pattern to validate against
 * @param errorMessage - Optional custom error message
 * @returns ValidationResult with isValid flag and message
 */
export const regexValidation = (
  value: string,
  regex: RegExp,
  errorMessage: string = 'Invalid format',
): ValidationResult => {
  const isValid = regex?.test(value);
  return {
    isValid,
    message: isValid ? '' : errorMessage,
  };
};

/**
 * Validate if a field is empty
 * @param value - The string value to check
 * @param errorMessage - Optional custom error message
 * @returns ValidationResult
 */
export const requiredValidation = (
  value: string,
  errorMessage: string = 'This field is required',
): ValidationResult => {
  const isValid = value !== undefined && value !== null && value.trim() !== '';
  return {
    isValid,
    message: isValid ? '' : errorMessage,
  };
};

/**
 * Validate minimum length
 * @param value - The string value to check
 * @param minLength - Minimum required length
 * @param errorMessage - Optional custom error message
 * @returns ValidationResult
 */
export const minLengthValidation = (
  value: string,
  minLength: number,
  errorMessage?: string,
): ValidationResult => {
  const isValid =
    value !== undefined && value !== null && value.length >= minLength;
  return {
    isValid,
    message: isValid
      ? ''
      : errorMessage || `Input must be at least ${minLength} characters`,
  };
};

/**
 * Validate maximum length
 * @param value - The string value to check
 * @param maxLength - Maximum allowed length
 * @param errorMessage - Optional custom error message
 * @returns ValidationResult
 */
export const maxLengthValidation = (
  value: string,
  maxLength: number,
  errorMessage?: string,
): ValidationResult => {
  const isValid = !value || value.length <= maxLength;
  return {
    isValid,
    message: isValid
      ? ''
      : errorMessage || `Input cannot exceed ${maxLength} characters`,
  };
};

/**
 * Run multiple validations in sequence
 * @param value - The string value to validate
 * @param validations - Array of validation functions to run
 * @returns First failed ValidationResult or success result
 */
export const runValidations = (
  value: string,
  validations: ((value: string) => ValidationResult)[],
): ValidationResult => {
  for (const validationFn of validations) {
    const result = validationFn(value);
    if (!result.isValid) {
      return result;
    }
  }
  return {isValid: true, message: ''};
};

/**
 * Common validation patterns for easy access
 */
export const patterns = {
  // Email validation regex
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone number validation regex (international format)
  PHONE: /^(\+\d{1,3}[-\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,

  // Password validation regex (min 8 chars, one uppercase, one lowercase, one number)
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,

  // Username validation regex (alphanumeric, 3-20 chars, underscores allowed)
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,

  // Name validation regex (letters, spaces, apostrophes, hyphens)
  NAME: /^[a-zA-Z\s'-]{2,50}$/,

  // URL validation regex
  URL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,

  // Numeric value validation regex (integers only)
  NUMERIC: /^[0-9]+$/,

  // Decimal value validation regex (positive or negative)
  DECIMAL: /^-?\d+(\.\d+)?$/,

  // Price validation regex (positive decimal with up to 2 decimal places)
  PRICE: /^\d+(\.\d{1,2})?$/,

  // Alphanumeric validation regex (letters and numbers only)
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,

  // Letters only validation regex
  LETTERS_ONLY: /^[a-zA-Z]+$/,
};

// Export convenience validation functions
export const validateEmail = (
  email: string,
  errorMessage?: string,
): ValidationResult =>
  regexValidation(
    email,
    patterns.EMAIL,
    errorMessage || 'Please enter a valid email address',
  );

export const validatePhone = (
  phone: string,
  errorMessage?: string,
): ValidationResult =>
  regexValidation(
    phone,
    patterns.PHONE,
    errorMessage || 'Please enter a valid phone number',
  );

export const validatePassword = (
  password: string,
  errorMessage?: string,
): ValidationResult =>
  regexValidation(
    password,
    patterns.PASSWORD,
    errorMessage ||
      'Password must be at least 8 characters with uppercase, lowercase, and number',
  );

export const validateUsername = (
  username: string,
  errorMessage?: string,
): ValidationResult =>
  regexValidation(
    username,
    patterns.USERNAME,
    errorMessage ||
      'Username must be 3-20 characters (letters, numbers, underscores)',
  );

export const validateName = (
  name: string,
  errorMessage?: string,
): ValidationResult =>
  regexValidation(
    name,
    patterns.NAME,
    errorMessage || 'Please enter a valid name',
  );

export const validateUrl = (
  url: string,
  errorMessage?: string,
): ValidationResult =>
  regexValidation(
    url,
    patterns.URL,
    errorMessage || 'Please enter a valid URL',
  );

export const validateNumeric = (
  value: string,
  errorMessage?: string,
): ValidationResult =>
  regexValidation(
    value,
    patterns.NUMERIC,
    errorMessage || 'Please enter numbers only',
  );

export const validateDecimal = (
  value: string,
  errorMessage?: string,
): ValidationResult =>
  regexValidation(
    value,
    patterns.DECIMAL,
    errorMessage || 'Please enter a valid decimal number',
  );

export const validatePrice = (
  price: string,
  errorMessage?: string,
): ValidationResult =>
  regexValidation(
    price,
    patterns.PRICE,
    errorMessage || 'Please enter a valid price (e.g., 10.99)',
  );
