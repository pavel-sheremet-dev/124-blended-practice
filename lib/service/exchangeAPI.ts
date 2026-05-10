import { Query } from '@/types/query';
import axios from 'axios';
import { Rate } from '../stores/currencyStore';

const apiKey = process.env.NEXT_PUBLIC_API_LAYER_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: apiKey ?? '' },
});

type ResponseData = {
  query: Query;
  info: {
    rate: number;
  };
  result: number;
};

export const exchangeCurrency = async (credentials: Query) => {
  const {
    data: { query, info, result },
  } = await instance.get<ResponseData>('/convert', {
    params: credentials,
  });

  return { ...query, rate: info.rate, result };
};

type RatesResponseData = {
  rates: {
    [x: string]: number;
  };
};

export const latestRates = async (baseCurrency: string): Promise<Rate[]> => {
  const { data } = await instance.get<RatesResponseData>(`/latest?symbols&base=${baseCurrency}`);

  return Object.entries(data.rates);
};
