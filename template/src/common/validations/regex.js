/**
 * Regex Validation Constants
 *
 * A collection of regex patterns for common input validations.
 */

// Email validation regex
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone number validation regex (international format)
export const PHONE_REGEX =
  /^(\+\d{1,3}[-\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;

// Password validation regex (min 8 chars, one uppercase, one lowercase, one number)
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Username validation regex (alphanumeric, 3-20 chars, underscores allowed)
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

// Name validation regex (letters, spaces, apostrophes, hyphens)
export const NAME_REGEX = /^[a-zA-Z\s'-]{2,50}$/;

// URL validation regex
export const URL_REGEX =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

// Postal/ZIP code validation regex (US and Canada)
export const POSTAL_CODE_REGEX =
  /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$|^\d{5}(-\d{4})?$/;

// Credit card validation regex (major card types)
export const CREDIT_CARD_REGEX =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/;

// Date validation regex (YYYY-MM-DD format)
export const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// IP Address validation regex
export const IP_ADDRESS_REGEX =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// Numeric value validation regex (integers only)
export const NUMERIC_REGEX = /^[0-9]+$/;

// Decimal value validation regex (positive or negative)
export const DECIMAL_REGEX = /^-?\d+(\.\d+)?$/;

// Price validation regex (positive decimal with up to 2 decimal places)
export const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;

// Alphanumeric validation regex (letters and numbers only)
export const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

// Letters only validation regex
export const LETTERS_ONLY_REGEX = /^[a-zA-Z]+$/;

// Strong password validation (8+ chars, upper, lower, number, special char)
export const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Time validation regex (HH:MM format, 24-hour)
export const TIME_24H_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Time validation regex (HH:MM format, 12-hour with AM/PM)
export const TIME_12H_REGEX = /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM|am|pm)$/;

// Hex color code validation regex
export const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Social security number validation regex (US format)
export const SSN_REGEX =
  /^(?!000|666|9\d{2})([0-8]\d{2})(?!00)(\d{2})(?!0000)(\d{4})$/;

// ISBN validation regex (ISBN-10 or ISBN-13)
export const ISBN_REGEX =
  /^(?:ISBN(?:-1[03])?:?\s)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-\s]){3})[-\s0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-\s]){4})[-\s0-9]{17}$)(?:97[89][-\s]?)?[0-9]{1,5}[-\s]?[0-9]+[-\s]?[0-9]+[-\s]?[0-9X]$/;

// Currency validation regex (with symbol and thousands separators)
export const CURRENCY_REGEX =
  /^[$€£¥]?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.[0-9]{1,2})?$/;

// MAC Address validation regex
export const MAC_ADDRESS_REGEX = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
