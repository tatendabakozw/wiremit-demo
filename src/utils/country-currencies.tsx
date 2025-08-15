import { symbol } from "framer-motion/client";

export interface Currency {
  /**
   * The ISO 4217 currency code (e.g., "USD").
   */
  code: string;
  /**
   * The full name of the currency (e.g., "United States Dollar").
   */
  name: string;
  /**
   * An emoji flag representing the primary country of the currency.
   */
  flag: string;

  symbol?: string; // Optional symbol, e.g. "$" for USD
}

export const currencies: Currency[] = [
  // Currencies you requested
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦', symbol: "ZAR" },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: "GBP" },
  
  // Key regional and international currencies
//   { code: 'USD', name: 'United States Dollar', flag: '🇺🇸' },
//   { code: 'ZWL', name: 'Zimbabwean Dollar', flag: '🇿🇼' },
//   { code: 'BWP', name: 'Botswana Pula', flag: '🇧🇼' },
//   { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
//   { code: 'ZMW', name: 'Zambian Kwacha', flag: '🇿🇲' }, // Using ZMW for current Kwacha
];