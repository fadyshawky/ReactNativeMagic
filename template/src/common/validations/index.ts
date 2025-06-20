/**
 * Validations Module
 *
 * Central export point for all validation utilities
 */

export * from './regexValidator';

// Additional regex patterns for specific use cases
export const REGEX_PATTERNS = {
  // Standard patterns (exported also from regexValidator)
  ...require('./regexValidator').patterns,

  // Additional patterns
  STRONG_PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  TIME_24H: /^([01]\d|2[0-3]):([0-5]\d)$/,
  TIME_12H: /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM|am|pm)$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  POSTAL_CODE: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$|^\d{5}(-\d{4})?$/,
  CURRENCY: /^[$€£¥]?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.[0-9]{1,2})?$/,
  MAC_ADDRESS: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,

  // Form input validation
  PRODUCT_SKU: /^[A-Za-z0-9-]{6,20}$/,
  QUANTITY: /^[1-9]\d*$/,
  DISCOUNT_PERCENTAGE: /^([0-9]|[1-9][0-9]|100)$/,
};
