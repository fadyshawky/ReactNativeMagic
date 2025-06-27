import {Alert, NativeModules} from 'react-native';
import {normalizeAndTrimWhitespace} from '../common/helpers/stringsHelpers';
import {decryptTripleDES} from '../core/utils/stringUtils';
import StringBuilder from './stringBuilder';
const {SunmiPrinter} = NativeModules;

// Localized messages for printer status
const PRINTER_MESSAGES = {
  en: {
    printerStatus_1: 'The printer works normally',
    printerStatus_2: 'Preparing printer',
    printerStatus_3: 'Abnormal communication',
    printerStatus_4: 'The printer is out of paper',
    printerStatus_5: 'Printer overheated',
    printerStatus_6: 'Printer cover is open',
    printerStatus_7: 'Unknown printer error',
  },
  ar: {
    printerStatus_1: 'الطابعة تعمل بشكل طبيعي',
    printerStatus_2: 'جاري تجهيز الطابعة',
    printerStatus_3: 'خطأ في الاتصال بالطابعة',
    printerStatus_4: 'نفذ الورق من الطابعة',
    printerStatus_5: 'الطابعة ساخنة جداً',
    printerStatus_6: 'غطاء الطابعة مفتوح',
    printerStatus_7: 'خطأ غير معروف في الطابعة',
  },
};

interface PrintDataItem {
  type:
    | 'image'
    | 'header1'
    | 'header2'
    | 'body'
    | 'extra_description'
    | 'body_title'
    | 'description';
  value: string;
  label?: string;
}

// Get localized message based on current language
const getMessage = (key: keyof typeof PRINTER_MESSAGES.en) => {
  // You can get the current language from your app's settings
  // For now, we'll use Arabic as default
  const currentLanguage = 'ar';
  return PRINTER_MESSAGES[currentLanguage][key];
};

type StatusMessageKey =
  | 'printerStatus_1'
  | 'printerStatus_2'
  | 'printerStatus_3'
  | 'printerStatus_4'
  | 'printerStatus_5'
  | 'printerStatus_6'
  | 'printerStatus_7';

function createRowSpaces(
  fontSize: number,
  leftText: string,
  rightText: string,
) {
  const paperWidth = 390;
  // Calculate character width based on paper width and font size
  const charWidth = 12 * (fontSize / 24); // Base char width is 12px at 24pt
  const maxChars = Math.floor(paperWidth / charWidth);

  // Format the text with proper spacing
  let row = new StringBuilder();

  // Truncate texts if they're too long (leaving space for at least 2 characters on each side)
  const maxLeftWidth = maxChars; // Reserve at least 2 chars for right text
  const maxRightWidth = maxChars; // Reserve at least 2 chars for left text

  const leftPart =
    leftText.length > maxLeftWidth
      ? leftText.substring(0, maxLeftWidth)
      : leftText;
  const rightPart =
    rightText.length > maxRightWidth
      ? rightText.substring(0, maxRightWidth)
      : rightText;
  // Calculate spacing
  const totalTextLength = leftPart.length + rightPart.length;
  const spacesNeeded = maxChars - totalTextLength;

  // Build the row with proper spacing
  row.append(leftPart);
  for (let i = 0; i < spacesNeeded; i++) {
    row.append(' ');
  }
  row.append(rightPart);

  return row.toString();
}

export const onBeePrint = async (data: any) => {
  try {
    await SunmiPrinter.prepare();
    await SunmiPrinter.printerInit();
    await SunmiPrinter.setFontStyle('bold', true);

    const status = await SunmiPrinter.getPrinterStatus();

    if (status !== 1) {
      Alert.alert(
        getMessage(`printerStatus_${status}` as StatusMessageKey) ||
          getMessage('printerStatus_7'),
      );
      return;
    }

    // Print the logo at the top

    let linesText = [];
    let linesAligns = [];
    let linesWidths = [];
    let linesFontSizes = [];

    for (let i = 0; i < data?.length; i++) {
      if (data[i].image) {
        if (linesText.length > 0) {
          await SunmiPrinter.printColumnsText(
            linesText,
            linesWidths,
            linesAligns,
            linesFontSizes,
          );
          // Clear the arrays after printing
          linesText = [];
          linesAligns = [];
          linesWidths = [];
          linesFontSizes = [];
        }
        // Print the image
        await printImage();
      } else if (data[i].middle) {
        linesText.push(`${data[i].middle}\n`);
        linesAligns.push(1); // Center align
        linesWidths.push(100);
        linesFontSizes.push(34);
      } else if (data[i].middleEnd) {
        linesText.push(`${data[i].middleEnd}\n`);
        linesAligns.push(1); // Center align
        linesWidths.push(100);
        linesFontSizes.push(data[i].fontSize || 34);
      } else if (data[i].line) {
        linesText.push(`--------------------------------\n`);
        linesAligns.push(0); // Left align
        linesWidths.push(384);
        linesFontSizes.push(24);
      } else if (data[i].powered) {
        if (data[i].powered !== '-1') {
          linesText.push(`${data[i].powered}\n`);
          linesAligns.push(1); // Center align
          linesWidths.push(100);
          linesFontSizes.push(data[i].fontSize || 24);
        }
      } else {
        const row = createRowSpaces(
          24,
          String(data[i].right) || '',
          String(normalizeAndTrimWhitespace(data[i].left)) || '',
        );
        linesText.push(`${row}\n`);
        linesAligns.push(1); // Center align
        linesWidths.push(384);
        linesFontSizes.push(24);
      }
    }

    if (linesText.length > 0) {
      await SunmiPrinter.printColumnsText(
        linesText,
        linesWidths,
        linesAligns,
        linesFontSizes,
      );
    }

    // Add minimal spacing at the end for paper cutting
    await SunmiPrinter.lineWrap(3);
  } catch (error) {
    console.error('Printing error:', error);

    // Display all keys and values from the error object
    if (error && typeof error === 'object') {
      console.error('Error details:');
      for (const [key, value] of Object.entries(error)) {
        console.error(`${key}: ${value}`);
      }
    }

    Alert.alert('Error', error.message || 'An unexpected error occurred');
  }
};

export const onPrint = async (
  data: {type: string; value: string; label?: string}[],
) => {
  try {
    // Initialize printer
    await SunmiPrinter.prepare();
    await SunmiPrinter.printerInit();
    await SunmiPrinter.setFontStyle('bold', true);

    const status = await SunmiPrinter.getPrinterStatus();

    if (status !== 1) {
      Alert.alert(
        getMessage(`printerStatus_${status}` as StatusMessageKey) ||
          getMessage('printerStatus_7'),
      );
      return;
    }

    let linesText = [];
    let linesAligns = [];
    let linesWidths = [];
    let linesFontSizes = [];

    for (let i = 0; i < data?.length; i++) {
      if (data[i].type === 'image') {
        // First print any accumulated text
        if (linesText.length > 0) {
          await SunmiPrinter.printColumnsText(
            linesText,
            linesWidths,
            linesAligns,
            linesFontSizes,
          );
          // Clear the arrays after printing
          linesText = [];
          linesAligns = [];
          linesWidths = [];
          linesFontSizes = [];
        }
        // Print the image
        await printImage();
      } else if (data[i].type === 'header1') {
        linesText.push(`${normalizeAndTrimWhitespace(data[i].value)}\n`);
        linesAligns.push(1);
        linesWidths.push(100);
        linesFontSizes.push(28);
      } else if (data[i].type === 'header2') {
        linesText.push(`${normalizeAndTrimWhitespace(data[i].value)}\n`);
        linesAligns.push(1);
        linesWidths.push(100);
        linesFontSizes.push(28);
      } else if (
        data[i].type === 'body' ||
        data[i].type === 'extra_description'
      ) {
        const row = createRowSpaces(
          24,
          String(data[i].label) || '',
          String(normalizeAndTrimWhitespace(data[i].value)) || '',
        );
        linesText.push(`${row}\n`);
        linesAligns.push(1);
        linesWidths.push(384);
        linesFontSizes.push(24);
      } else if (data[i].type === 'body_title') {
        linesText.push(`--------------------------------\n`);
        const row = createRowSpaces(
          30,
          String(data[i].label) || '',
          String(normalizeAndTrimWhitespace(data[i].value)) || '',
        );
        linesText.push(`${row}\n`);
        linesAligns.push(1);
        linesAligns.push(1);
        linesWidths.push(384);
        linesWidths.push(384);
        linesFontSizes.push(24);
        linesFontSizes.push(30);
      } else if (data[i].type === 'description') {
        linesText.push(`--------------------------------\n`);
        if (data[i].label && data[i].label !== 'VouchPIN') {
          linesText.push(`${data[i].label}\n`);
          linesAligns.push(1);
          linesWidths.push(384);
          linesFontSizes.push(24);
        }
        linesText.push(
          `${
            data[i].label === 'VouchPIN'
              ? decryptTripleDES(
                  data[i].value,
                  '8pe/hqinrZQV6pHNkQ0WwbD0ZHkaAbbj',
                )
              : normalizeAndTrimWhitespace(data[i].value)
          }\n`,
        );
        linesAligns.push(1);
        linesAligns.push(1);
        linesWidths.push(384);
        linesWidths.push(100);
        linesFontSizes.push(24);
        linesFontSizes.push(24);
      }
    }

    // Print any remaining text
    if (linesText.length > 0) {
      await SunmiPrinter.printColumnsText(
        linesText,
        linesWidths,
        linesAligns,
        linesFontSizes,
      );
    }

    // Add minimal spacing at the end for paper cutting
    await SunmiPrinter.lineWrap(3);
  } catch (error) {
    console.error('Printing error:', error);

    // Display all keys and values from the error object
    if (error && typeof error === 'object') {
      console.error('Error details:');
      for (const [key, value] of Object.entries(error)) {
        console.error(`${key}: ${value}`);
      }
    }

    // Display a user-friendly alert with the error message
    const errorMessage = error.message || 'An unexpected error occurred';
    Alert.alert('Error', errorMessage);
  }
};

// Helper function to print a single row with left and right aligned text
export const printRow = async (
  leftText: string,
  rightText: string,
  fontSize = 24,
) => {
  try {
    await SunmiPrinter.printRowText(leftText || '', rightText || '', fontSize);
    // Add a small line wrap after each row
    await SunmiPrinter.lineWrap(1);
  } catch (error) {
    console.error('Row printing error:', error);
  }
};

// Helper function to feed paper
export const feedPaper = async (lines = 1) => {
  try {
    await SunmiPrinter.lineWrap(lines);
  } catch (error) {
    console.error('Paper feed error:', error);
  }
};

// Function to convert image to base64 and print it
export const printImage = async (width: number = 384) => {
  try {
    // Get the image dimensions
    // const image = Image.resolveAssetSource(
    //   ImageResources.receipt_logo_transparent,
    // );

    // if (!image || !image.uri) {
    //   throw new Error('Image asset not found or URI is invalid');
    // }

    // // Convert image to base64
    // const response = await fetch(image.uri);
    // if (!response.ok) {
    //   throw new Error(`Failed to fetch image: ${response.statusText}`);
    // }

    // const blob = await response.blob();
    // const base64 = await new Promise((resolve, reject) => {
    //   const reader = new FileReader();
    //   reader.onload = () => resolve(reader.result);
    //   reader.onerror = error => {
    //     console.error('FileReader error:', error);
    //     reject(error);
    //   };
    //   reader.readAsDataURL(blob);
    // });

    // Remove the data URL prefix (e.g., "data:image/png;base64,")
    const base64Data =
      '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';

    // Print the image
    await SunmiPrinter.printLogoText(base64Data, width);
    await feedPaper(2); // Add some space after the image
  } catch (error) {
    console.error('Error printing image:', error);

    // Display all keys and values from the error object
    if (error && typeof error === 'object') {
      console.error('Error details:');
      for (const [key, value] of Object.entries(error)) {
        console.error(`${key}: ${value}`);
      }
    }

    throw error;
  }
};

export const SunmiPrinterModule = {
  printColumnsText: async (
    texts: string[],
    widths: number[],
    aligns: number[],
    fontSizes: number[] = Array(texts.length).fill(24), // Default all to 24 if not provided
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      SunmiPrinter.printColumnsText(
        texts,
        widths,
        aligns,
        fontSizes,
        (error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  },
};

// Example function showing how to use printColumnsText with different font sizes
export const printExampleReceipt = async () => {
  await SunmiPrinter.printColumnsText(
    ['Item\n', 'Price\n', 'Qty\n'],
    [100, 100, 100],
    [0, 2, 1], // 0=left, 1=center, 2=right
    [24, 32, 24], // Different font sizes for each column
  );
};
