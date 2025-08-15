import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/solid';
import { currencies, Currency } from '@/utils/country-currencies';

interface AmountInputProps {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  label?: string;
  editable?: boolean;
  hint?: string;
  maxAmount?: number;
  showMaxHint?: boolean;
}

const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  setAmount,
  selectedCurrency,
  setSelectedCurrency,
  label = 'Amount',
  editable = true,
  hint,
  maxAmount,
  showMaxHint = true,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
    setShowDropdown(false);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const validAmountRegex = /^\d*\.?\d{0,2}$/;
    if (validAmountRegex.test(value) || value === '') {
      setAmount(value);
    }
  };

  // Calculate if amount exceeds max
  const amountExceedsMax = maxAmount !== undefined && Number(amount) > maxAmount;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <label htmlFor="amount-input" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {showMaxHint && maxAmount !== undefined && (
          <span className="text-xs text-gray-500">
            Max: {selectedCurrency.symbol}{maxAmount.toFixed(2)}
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        <input
          id="amount-input"
          type="text"
          inputMode="decimal"
          className={`w-full pl-4 pr-28 py-2.5 border ${
            amountExceedsMax ? 'border-secondary-500' : 'border-gray-300'
          } rounded-xl focus:outline-none focus:ring-2 ${
            amountExceedsMax ? 'focus:ring-secondary-500/20' : 'focus:ring-primary-500/20'
          } focus:border-primary-500 transition-colors ${
            !editable ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
          }`}
          placeholder="0.00"
          value={amount}
          onChange={handleAmountChange}
          disabled={!editable}
        />

        {/* Currency Picker Dropdown */}
        <div ref={dropdownRef} className="absolute right-1 top-1 bottom-1">
          <button
            type="button"
            onClick={() => editable && setShowDropdown((prev) => !prev)}
            className="flex items-center h-full gap-1.5 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
            disabled={!editable}
          >
            <span className="text-lg">{selectedCurrency.flag}</span>
            <span className="text-sm font-medium text-gray-800">{selectedCurrency.code}</span>
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          </button>

          {showDropdown && (
            <div className="absolute z-10 top-full right-0 mt-2 w-64 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  type="button"
                  onClick={() => handleSelectCurrency(currency)}
                  className={`flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors ${
                    selectedCurrency.code === currency.code ? 'font-semibold' : ''
                  }`}
                >
                  <span className="text-xl mr-3">{currency.flag}</span>
                  <div className="flex-1">
                    <div className="text-sm text-gray-800">{currency.name}</div>
                    <div className="text-xs text-gray-500">{currency.code}</div>
                  </div>
                  {selectedCurrency.code === currency.code && (
                    <CheckIcon className="w-5 h-5 text-primary-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hint and validation messages */}
      <div className="mt-1 space-y-1">
        {hint && !amountExceedsMax && (
          <p className="text-xs text-gray-500">{hint}</p>
        )}
        {amountExceedsMax && (
          <p className="text-xs text-secondary-600">
            Amount exceeds maximum of {selectedCurrency.symbol}{maxAmount?.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default AmountInput;