import {NativeModules, Platform} from 'react-native';

const {SunmiPrinterInternal} = NativeModules;

// Create a wrapper with error handling
const SunmiPrinterInternalWrapper = {
  // Check if the module is available
  isAvailable: () => {
    return (
      !!SunmiPrinterInternal &&
      typeof SunmiPrinterInternal === 'object' &&
      Object.keys(SunmiPrinterInternal).length > 0
    );
  },

  // Get the status of the printer
  getStatus: async () => {
    if (!SunmiPrinterInternalWrapper.isAvailable()) {
      console.error('SunmiPrinterInternal module is not available');
      return {
        connected: false,
        error: 'SunmiPrinterInternal module is not available',
      };
    }

    try {
      if (SunmiPrinterInternal.getStatus) {
        return await SunmiPrinterInternal.getStatus();
      } else {
        return {
          connected: false,
          error: 'getStatus method is not available',
        };
      }
    } catch (error) {
      console.error('Error getting printer status:', error);
      return {
        connected: false,
        error: error.message || 'Unknown error',
      };
    }
  },

  // Print text
  printText: async text => {
    if (!SunmiPrinterInternalWrapper.isAvailable()) {
      console.error('SunmiPrinterInternal module is not available');
      throw new Error('SunmiPrinterInternal module is not available');
    }

    if (!SunmiPrinterInternal.printText) {
      console.error('printText method is not available');
      throw new Error('printText method is not available');
    }

    try {
      return await SunmiPrinterInternal.printText(text);
    } catch (error) {
      console.error('Error printing text:', error);
      throw error;
    }
  },

  // Print text with font
  printTextWithFont: async (text, typeface = '', fontSize = 24) => {
    if (!SunmiPrinterInternalWrapper.isAvailable()) {
      console.error('SunmiPrinterInternal module is not available');
      throw new Error('SunmiPrinterInternal module is not available');
    }

    if (!SunmiPrinterInternal.printTextWithFont) {
      console.error('printTextWithFont method is not available');
      throw new Error('printTextWithFont method is not available');
    }

    try {
      return await SunmiPrinterInternal.printTextWithFont(
        text,
        typeface,
        fontSize,
      );
    } catch (error) {
      console.error('Error printing text with font:', error);
      throw error;
    }
  },

  // Print bold text
  printBoldText: async text => {
    if (!SunmiPrinterInternalWrapper.isAvailable()) {
      console.error('SunmiPrinterInternal module is not available');
      throw new Error('SunmiPrinterInternal module is not available');
    }

    if (!SunmiPrinterInternal.printBoldText) {
      console.error('printBoldText method is not available');
      throw new Error('printBoldText method is not available');
    }

    try {
      return await SunmiPrinterInternal.printBoldText(text);
    } catch (error) {
      console.error('Error printing bold text:', error);
      throw error;
    }
  },

  // Print barcode
  printBarCode: async (
    data,
    symbology = 8,
    height = 80,
    width = 2,
    textPosition = 2,
  ) => {
    if (!SunmiPrinterInternalWrapper.isAvailable()) {
      console.error('SunmiPrinterInternal module is not available');
      throw new Error('SunmiPrinterInternal module is not available');
    }

    if (!SunmiPrinterInternal.printBarCode) {
      console.error('printBarCode method is not available');
      throw new Error('printBarCode method is not available');
    }

    try {
      return await SunmiPrinterInternal.printBarCode(
        data,
        symbology,
        height,
        width,
        textPosition,
      );
    } catch (error) {
      console.error('Error printing barcode:', error);
      throw error;
    }
  },

  // Print QR code
  printQRCode: async (data, moduleSize = 8, errorLevel = 0) => {
    if (!SunmiPrinterInternalWrapper.isAvailable()) {
      console.error('SunmiPrinterInternal module is not available');
      throw new Error('SunmiPrinterInternal module is not available');
    }

    if (!SunmiPrinterInternal.printQRCode) {
      console.error('printQRCode method is not available');
      throw new Error('printQRCode method is not available');
    }

    try {
      return await SunmiPrinterInternal.printQRCode(
        data,
        moduleSize,
        errorLevel,
      );
    } catch (error) {
      console.error('Error printing QR code:', error);
      throw error;
    }
  },

  // Print image
  printImage: async base64Image => {
    if (!SunmiPrinterInternalWrapper.isAvailable()) {
      console.error('SunmiPrinterInternal module is not available');
      throw new Error('SunmiPrinterInternal module is not available');
    }

    if (!SunmiPrinterInternal.printImage) {
      console.error('printImage method is not available');
      throw new Error('printImage method is not available');
    }

    try {
      return await SunmiPrinterInternal.printImage(base64Image);
    } catch (error) {
      console.error('Error printing image:', error);
      throw error;
    }
  },

  // Line wrap
  lineWrap: async (lines = 3) => {
    if (!SunmiPrinterInternalWrapper.isAvailable()) {
      console.error('SunmiPrinterInternal module is not available');
      throw new Error('SunmiPrinterInternal module is not available');
    }

    if (!SunmiPrinterInternal.lineWrap) {
      console.error('lineWrap method is not available');
      throw new Error('lineWrap method is not available');
    }

    try {
      return await SunmiPrinterInternal.lineWrap(lines);
    } catch (error) {
      console.error('Error line wrapping:', error);
      throw error;
    }
  },

  // Cut paper
  cutPaper: async () => {
    if (!SunmiPrinterInternalWrapper.isAvailable()) {
      console.error('SunmiPrinterInternal module is not available');
      throw new Error('SunmiPrinterInternal module is not available');
    }

    if (!SunmiPrinterInternal.cutPaper) {
      console.error('cutPaper method is not available');
      throw new Error('cutPaper method is not available');
    }

    try {
      return await SunmiPrinterInternal.cutPaper();
    } catch (error) {
      console.error('Error cutting paper:', error);
      throw error;
    }
  },

  // Print receipt
  printReceipt: async receiptData => {
    if (!SunmiPrinterInternalWrapper.isAvailable()) {
      console.error('SunmiPrinterInternal module is not available');
      throw new Error('SunmiPrinterInternal module is not available');
    }

    try {
      // Print header
      await SunmiPrinterInternalWrapper.printBoldText(receiptData.header);
      await SunmiPrinterInternalWrapper.lineWrap(1);

      // Print items
      for (const item of receiptData.items) {
        await SunmiPrinterInternalWrapper.printText(
          `${item.name} x${item.quantity} $${item.price}`,
        );
      }

      await SunmiPrinterInternalWrapper.lineWrap(1);

      // Print total
      await SunmiPrinterInternalWrapper.printBoldText(
        `Total: $${receiptData.total}`,
      );

      // Print footer
      await SunmiPrinterInternalWrapper.lineWrap(2);
      await SunmiPrinterInternalWrapper.printText(receiptData.footer);

      // Cut paper
      await SunmiPrinterInternalWrapper.lineWrap(3);
      if (SunmiPrinterInternal.cutPaper) {
        await SunmiPrinterInternalWrapper.cutPaper();
      }

      return true;
    } catch (error) {
      console.error('Error printing receipt:', error);
      throw error;
    }
  },
};

export default SunmiPrinterInternalWrapper;
