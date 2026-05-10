'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import { Query } from '@/types/query';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function ExchangeForm() {
  const setExchangeInfo = useCurrencyStore((state) => state.setExchangeInfo);
  const setLoading = useCurrencyStore((state) => state.setLoading);
  const setError = useCurrencyStore((state) => state.setError);

  const handleSubmit = async (formData: FormData) => {
    const data = formData.get('currency') as string;
    const [amount, from, , to] = data.split(' ');
    const query: Query = {
      amount: Number(amount),
      from,
      to,
    };
    try {
      setLoading(true);
      setError(false);
      const exchangeInfo = await exchangeCurrency(query);
      setExchangeInfo(exchangeInfo);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form action={handleSubmit} className={styles.form}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
