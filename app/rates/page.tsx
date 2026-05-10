'use client';

import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';

import css from './RatesPage.module.css';
import { useEffect } from 'react';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { latestRates } from '@/lib/service/exchangeAPI';
import Loader from '@/components/Loader/Loader';

export default function RatesPage() {
  const setLoading = useCurrencyStore((state) => state.setLoading);
  const setError = useCurrencyStore((state) => state.setError);
  const isError = useCurrencyStore((state) => state.isError);
  const isLoading = useCurrencyStore((state) => state.isLoading);
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
  const setRates = useCurrencyStore((state) => state.setRates);

  useEffect(() => {
    if (!baseCurrency) return;
    const asyncWrapper = async () => {
      try {
        setLoading(true);
        setError(false);
        const rates = await latestRates(baseCurrency);
        setRates(rates);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    asyncWrapper();
  }, [baseCurrency, setError, setLoading, setRates]);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />

          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
          {isLoading && <Loader />}
        </Container>
      </Section>
    </main>
  );
}
