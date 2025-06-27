import {NativeModules, Platform} from 'react-native';

const {SunmiCardModule} = NativeModules;

if (!SunmiCardModule) {
  throw new Error('SunmiCardModule is not available on this device');
}

/**
 * Interface for Sunmi Card Reader functionality
 */
class SunmiCard {
  /**
   * Card types constants
   */
  static CARD_TYPE_MAGNETIC = SunmiCardModule.CARD_TYPE_MAGNETIC;
  static CARD_TYPE_IC = SunmiCardModule.CARD_TYPE_IC;
  static CARD_TYPE_NFC = SunmiCardModule.CARD_TYPE_NFC;
  static CARD_TYPE_MAGNETIC_IC = SunmiCardModule.CARD_TYPE_MAGNETIC_IC;
  static CARD_TYPE_MAGNETIC_NFC = SunmiCardModule.CARD_TYPE_MAGNETIC_NFC;
  static CARD_TYPE_IC_NFC = SunmiCardModule.CARD_TYPE_IC_NFC;
  static CARD_TYPE_MAGNETIC_IC_NFC = SunmiCardModule.CARD_TYPE_MAGNETIC_IC_NFC;

  /**
   * Card reader mode constants
   */
  static READ_MODE_MAGNETIC = SunmiCardModule.READ_MODE_MAGNETIC;
  static READ_MODE_IC = SunmiCardModule.READ_MODE_IC;
  static READ_MODE_NFC = SunmiCardModule.READ_MODE_NFC;

  /**
   * Track error code constants
   */
  static TRACK_ERROR_NONE = SunmiCardModule.TRACK_ERROR_NONE; // No error
  static TRACK_ERROR_NO_DATA = SunmiCardModule.TRACK_ERROR_NO_DATA; // Track has no data
  static TRACK_ERROR_PARITY = SunmiCardModule.TRACK_ERROR_PARITY; // Track parity check error
  static TRACK_ERROR_LRC = SunmiCardModule.TRACK_ERROR_LRC; // Track LRC check error

  /**
   * Check if the Sunmi Pay SDK is connected
   * @returns {Promise<boolean>} - True if connected
   */
  static isConnected() {
    if (Platform.OS !== 'android') {
      return Promise.reject(
        new Error('SunmiCard is only available on Android'),
      );
    }

    return SunmiCardModule.isConnected();
  }

  /**
   * Check for a card to be presented
   * @param {number} cardType - Type of card to check for (use CARD_TYPE_* constants)
   * @param {number} timeout - Timeout in seconds
   * @returns {Promise<Object>} - Card information or timeout/error
   *
   * For magnetic cards, the result will include:
   * - type: "magnetic"
   * - track1: Track 1 data (if available)
   * - track2: Track 2 data (if available)
   * - track3: Track 3 data (if available)
   * - track1ErrorCode: Error code for track 1 (0 = no error, -1 = no data, -2 = parity error, -3 = LRC error)
   * - track2ErrorCode: Error code for track 2
   * - track3ErrorCode: Error code for track 3
   *
   * For IC cards, the result will include:
   * - type: "ic"
   * - atr: ATR data
   *
   * For NFC cards, the result will include:
   * - type: "nfc"
   * - uuid: Card UUID
   *
   * For timeout, the result will include:
   * - type: "timeout"
   */
  static checkCard(cardType, timeout = 60) {
    if (Platform.OS !== 'android') {
      return Promise.reject(
        new Error('SunmiCard is only available on Android'),
      );
    }

    if (typeof cardType !== 'number') {
      return Promise.reject(new Error('cardType must be a number'));
    }

    if (typeof timeout !== 'number') {
      return Promise.reject(new Error('timeout must be a number'));
    }

    return SunmiCardModule.checkCard(cardType, timeout);
  }

  /**
   * Cancel an ongoing card check operation
   * @returns {Promise<boolean>} - True if successful
   */
  static cancelCardCheck() {
    if (Platform.OS !== 'android') {
      return Promise.reject(
        new Error('SunmiCard is only available on Android'),
      );
    }

    return SunmiCardModule.cancelCardCheck();
  }

  /**
   * Read data from an IC card
   * Note: This method is provided for backward compatibility.
   * It's recommended to use checkCard with CARD_TYPE_IC instead.
   * @returns {Promise<Object>} - IC card information
   */
  static readICCard() {
    if (Platform.OS !== 'android') {
      return Promise.reject(
        new Error('SunmiCard is only available on Android'),
      );
    }

    return SunmiCardModule.readICCard();
  }

  /**
   * Read data from an NFC card
   * Note: This method is provided for backward compatibility.
   * It's recommended to use checkCard with CARD_TYPE_NFC instead.
   * @returns {Promise<Object>} - NFC card information
   */
  static readNFCCard() {
    if (Platform.OS !== 'android') {
      return Promise.reject(
        new Error('SunmiCard is only available on Android'),
      );
    }

    return SunmiCardModule.readNFCCard();
  }

  /**
   * Transaction types
   */
  static TRANS_TYPE_CONSUME = SunmiCardModule.TRANS_TYPE_CONSUME;
  static TRANS_TYPE_REFUND = SunmiCardModule.TRANS_TYPE_REFUND;

  /**
   * Transaction result codes
   */
  static TRANS_RESULT_SUCCESS = SunmiCardModule.TRANS_RESULT_SUCCESS;
  static TRANS_RESULT_OFFLINE_APPROVED =
    SunmiCardModule.TRANS_RESULT_OFFLINE_APPROVED;
  static TRANS_RESULT_DECLINED = SunmiCardModule.TRANS_RESULT_DECLINED;
  static TRANS_RESULT_TERMINATED = SunmiCardModule.TRANS_RESULT_TERMINATED;
  static TRANS_RESULT_CANCEL = SunmiCardModule.TRANS_RESULT_CANCEL;
  static TRANS_RESULT_TIMEOUT = SunmiCardModule.TRANS_RESULT_TIMEOUT;
  static TRANS_RESULT_OTHER_ERROR = SunmiCardModule.TRANS_RESULT_OTHER_ERROR;
  static TRANS_RESULT_MAC_ERROR = SunmiCardModule.TRANS_RESULT_MAC_ERROR;
  static TRANS_RESULT_FALLBACK = SunmiCardModule.TRANS_RESULT_FALLBACK;

  /**
   * Start a card payment transaction
   * @param {number} amount - The transaction amount in cents (e.g., 1000 for $10.00)
   * @param {string} currency - The currency code (e.g., "USD")
   * @param {string} transactionType - The transaction type ("consume" or "refund")
   * @param {number} timeout - Timeout in seconds for card detection
   * @returns {Promise<Object>} - Transaction result object
   */
  static startCardPayment(
    amount,
    currency = 'USD',
    transactionType = 'consume',
    timeout = 60,
  ) {
    if (typeof amount !== 'number' || amount <= 0) {
      return Promise.reject(new Error('Amount must be a positive number'));
    }

    // Convert transaction type string to integer
    let transType = SunmiCard.TRANS_TYPE_CONSUME;
    if (transactionType.toLowerCase() === 'refund') {
      transType = SunmiCard.TRANS_TYPE_REFUND;
    }

    return SunmiCardModule.startCardPayment(
      amount,
      currency,
      transactionType,
      timeout,
    );
  }

  /**
   * Cancel an ongoing card payment transaction
   * @returns {Promise<boolean>} - True if canceled successfully
   */
  static cancelCardPayment() {
    return SunmiCardModule.cancelCardPayment();
  }

  /**
   * Get the result of the last transaction
   * @returns {Promise<Object|null>} - Transaction result object or null if no transaction
   */
  static getLastTransactionResult() {
    return SunmiCardModule.getLastTransactionResult();
  }
}

export default SunmiCard;
