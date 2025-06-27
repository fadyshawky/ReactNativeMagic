import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import SunmiPrinter from '../utils/SunmiPrinter';

const PrinterExample = () => {
  const [isPrinterAvailable, setIsPrinterAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkPrinterAvailability();
  }, []);

  const checkPrinterAvailability = async () => {
    try {
      const available = await SunmiPrinter.isPrinterAvailable();
      setIsPrinterAvailable(available);
    } catch (error) {
      console.error('Error checking printer availability:', error);
      setIsPrinterAvailable(false);
    }
  };

  const handlePrintText = async () => {
    if (!isPrinterAvailable) {
      Alert.alert('Printer Error', 'Printer is not available');
      return;
    }

    setIsLoading(true);
    try {
      await SunmiPrinter.printText(
        'Hello, Sunmi Printer!\n',
        SunmiPrinter.FONT_SIZE_LARGE,
      );
      await SunmiPrinter.feedPaper(3);
      Alert.alert('Success', 'Text printed successfully');
    } catch (error) {
      console.error('Error printing text:', error);
      Alert.alert('Print Error', error.message || 'Failed to print text');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrintCenteredText = async () => {
    if (!isPrinterAvailable) {
      Alert.alert('Printer Error', 'Printer is not available');
      return;
    }

    setIsLoading(true);
    try {
      await SunmiPrinter.printTextWithAlignment(
        'Centered Text Example\n',
        SunmiPrinter.FONT_SIZE_LARGE,
        SunmiPrinter.ALIGN_CENTER,
      );
      await SunmiPrinter.feedPaper(3);
      Alert.alert('Success', 'Centered text printed successfully');
    } catch (error) {
      console.error('Error printing centered text:', error);
      Alert.alert(
        'Print Error',
        error.message || 'Failed to print centered text',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrintDivider = async () => {
    if (!isPrinterAvailable) {
      Alert.alert('Printer Error', 'Printer is not available');
      return;
    }

    setIsLoading(true);
    try {
      await SunmiPrinter.printDivider();
      await SunmiPrinter.feedPaper(3);
      Alert.alert('Success', 'Divider printed successfully');
    } catch (error) {
      console.error('Error printing divider:', error);
      Alert.alert('Print Error', error.message || 'Failed to print divider');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrintSampleReceipt = async () => {
    if (!isPrinterAvailable) {
      Alert.alert('Printer Error', 'Printer is not available');
      return;
    }

    setIsLoading(true);
    try {
      await SunmiPrinter.printSampleReceipt();
      Alert.alert('Success', 'Sample receipt printed successfully');
    } catch (error) {
      console.error('Error printing sample receipt:', error);
      Alert.alert(
        'Print Error',
        error.message || 'Failed to print sample receipt',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sunmi Printer Example</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Printer Status:</Text>
        <Text
          style={[
            styles.statusValue,
            {color: isPrinterAvailable ? 'green' : 'red'},
          ]}>
          {isPrinterAvailable ? 'Available' : 'Not Available'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handlePrintText}
        disabled={isLoading}>
        <Text style={styles.buttonText}>Print Text</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handlePrintCenteredText}
        disabled={isLoading}>
        <Text style={styles.buttonText}>Print Centered Text</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handlePrintDivider}
        disabled={isLoading}>
        <Text style={styles.buttonText}>Print Divider</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handlePrintSampleReceipt}
        disabled={isLoading}>
        <Text style={styles.buttonText}>Print Sample Receipt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.refreshButton,
          isLoading && styles.buttonDisabled,
        ]}
        onPress={checkPrinterAvailability}
        disabled={isLoading}>
        <Text style={styles.buttonText}>Refresh Printer Status</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  refreshButton: {
    backgroundColor: '#4CAF50',
  },
});

export default PrinterExample;
