import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {
  regexValidation,
  patterns,
  ValidationResult,
  requiredValidation,
  runValidations,
} from '../regexValidator';

interface TextInputWithValidationProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  validationType?:
    | 'email'
    | 'password'
    | 'phone'
    | 'name'
    | 'username'
    | 'numeric'
    | 'price'
    | 'custom';
  customRegex?: RegExp;
  customErrorMessage?: string;
  required?: boolean;
  minLength?: number;
}

/**
 * A reusable text input component with built-in validation
 */
const TextInputWithValidation: React.FC<TextInputWithValidationProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  validationType = 'custom',
  customRegex,
  customErrorMessage,
  required = false,
  minLength,
}) => {
  const [touched, setTouched] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    message: '',
  });

  // Get the appropriate regex based on validation type
  const getRegexForType = (): RegExp => {
    switch (validationType) {
      case 'email':
        return patterns.EMAIL;
      case 'password':
        return patterns.PASSWORD;
      case 'phone':
        return patterns.PHONE;
      case 'name':
        return patterns.NAME;
      case 'username':
        return patterns.USERNAME;
      case 'numeric':
        return patterns.NUMERIC;
      case 'price':
        return patterns.PRICE;
      case 'custom':
        return customRegex || /^.*$/; // Allow anything if no custom regex
      default:
        return /^.*$/;
    }
  };

  // Get the default error message based on validation type
  const getDefaultErrorMessage = (): string => {
    switch (validationType) {
      case 'email':
        return 'Please enter a valid email address';
      case 'password':
        return 'Password must be at least 8 characters with uppercase, lowercase, and number';
      case 'phone':
        return 'Please enter a valid phone number';
      case 'name':
        return 'Please enter a valid name';
      case 'username':
        return 'Username must be 3-20 characters (letters, numbers, underscores)';
      case 'numeric':
        return 'Please enter numbers only';
      case 'price':
        return 'Please enter a valid price (e.g., 10.99)';
      default:
        return customErrorMessage || 'Invalid input';
    }
  };

  // Validate the input when it loses focus
  const handleBlur = () => {
    setTouched(true);

    // Build validations array
    const validations = [];

    // Add required validation if needed
    if (required) {
      validations.push((val: string) =>
        requiredValidation(val, 'This field is required'),
      );
    }

    // Add pattern validation if it's not empty
    validations.push((val: string) => {
      // Skip empty validation if not required
      if (!required && (!val || val.trim() === '')) {
        return {isValid: true, message: ''};
      }
      return regexValidation(val, getRegexForType(), getDefaultErrorMessage());
    });

    // Run all validations
    const result = runValidations(value, validations);
    setValidationResult(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          touched && !validationResult.isValid && styles.inputError,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
      />
      {touched && !validationResult.isValid && (
        <Text style={styles.errorText}>{validationResult.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 4,
  },
});

export default TextInputWithValidation;

// Usage Example:
/*
import { TextInputWithValidation } from 'src/common/validations/examples';

const MyForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [customField, setCustomField] = useState('');

  return (
    <View>
      <TextInputWithValidation
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        validationType="email"
        required
      />
      
      <TextInputWithValidation
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        validationType="password"
        required
        secureTextEntry
      />
      
      <TextInputWithValidation
        label="Phone Number"
        placeholder="Enter your phone number"
        value={phone}
        onChangeText={setPhone}
        validationType="phone"
      />
      
      <TextInputWithValidation
        label="Product ID"
        placeholder="Enter product ID"
        value={customField}
        onChangeText={setCustomField}
        validationType="custom"
        customRegex={/^PRD-[0-9]{6}$/}
        customErrorMessage="Product ID must be in format PRD-123456"
        required
      />
    </View>
  );
};
*/
