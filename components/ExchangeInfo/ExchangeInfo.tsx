import { type ExchangeInfo } from '@/lib/stores/currencyStore';
import styles from './ExchangeInfo.module.css';

interface ExchangeInfoProps {
  data: ExchangeInfo;
}

export default function ExchangeInfo({
  data: { amount, from, to, rate, result },
}: ExchangeInfoProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <p className={styles.details}>
          <span className={styles.accent}>{amount} </span>
          <span className={styles.accent}>{from} </span>
          in <span className={styles.accent}>{to}</span>
        </p>

        <p className={styles.details}>
          at the rate of
          <span className={styles.accent}> {rate}</span>
        </p>

        <p className={styles.title}>
          {result.toFixed(2)} {to}
        </p>
      </div>
    </div>
  );
}
