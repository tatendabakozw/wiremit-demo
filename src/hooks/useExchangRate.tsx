import { useEffect, useState } from "react";
import axios from "axios";

type ApiResponseItem = Record<string, number>;
type ExchangeRates = Record<string, number>;

interface UseExchangeRatesResult {
  rates: ExchangeRates;
  loading: boolean;
  error: string | null;
}

export function useExchangeRates(): UseExchangeRatesResult {
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<ApiResponseItem[]>(
          "https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS"
        );

        // Convert array of objects into single object { USD: 1, GBP: 0.74, ... }
        const merged: ExchangeRates = res.data.reduce((acc, curr) => {
          const [currency, value] = Object.entries(curr)[0];
          acc[currency] = value;
          return acc;
        }, {} as ExchangeRates);

        setRates(merged);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return { rates, loading, error };
}
