import React, {Dispatch, SetStateAction} from 'react';

interface FeeTier {
  LowerAmt: number;
  UpperAmt: number;
  FixedAmt: {
    Amt: number;
    CurCode: string;
  };
}

interface FeesCalculationResult {
  amount: number;
  vat_value: number;
  total: number;
  currencyCode: string;
}

// Calculate from amount to total (forward calculation)
export const calculateFeesForward = (
  amount: string | number,
  vat_value: number,
  currencyCode: string,
): FeesCalculationResult => {
  const numericAmount =
    typeof amount === 'string' ? parseFloat(amount) || 0 : amount;
  const total = numericAmount / vat_value;

  return {
    amount: numericAmount,
    vat_value,
    total,
    currencyCode,
  };
};

// Calculate from total to amount (backward calculation)
export const calculateFeesBackward = (
  total: string | number,
  vat_value: number,
  currencyCode: string,
): FeesCalculationResult => {
  const numericTotal =
    typeof total === 'string' ? parseFloat(total) || 0 : total;
  const amount = numericTotal * vat_value;

  return {
    amount,
    vat_value,
    total: numericTotal,
    currencyCode,
  };
};

// Hook for bi-directional calculation
export const useFeesCalculation = (
  amount: string,
  vat_value: number,
  currencyCode: string,
  vatValue: string,
  setVatValue: Dispatch<SetStateAction<string>>,
  setAmount: Dispatch<SetStateAction<string>>,
) => {
  const calculateFromAmount = (amountValue: string) => {
    if (!amountValue || !vat_value) {
      setVatValue('');
      return;
    }
    const numericAmount = parseFloat(amountValue);
    if (!isNaN(numericAmount)) {
      const total = numericAmount / vat_value;
      setVatValue(total.toFixed(1));
    }
  };

  const calculateFromVat = (vatVal: string) => {
    if (!vatVal || !vat_value) {
      setAmount('');
      return;
    }
    const numericTotal = parseFloat(vatVal);
    if (!isNaN(numericTotal)) {
      const calculatedAmount = numericTotal * vat_value;
      setAmount(calculatedAmount.toFixed(1));
    }
  };

  return {
    calculateFromAmount,
    calculateFromVat,
  };
};
