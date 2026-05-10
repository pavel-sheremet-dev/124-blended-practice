import axios from 'axios';

export const getUserInfo = async ({ latitude, longitude }: GeolocationPosition['coords']) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  const { data } = await axios.get(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });
  const curency = data.results[0].annotations.currency.iso_code as string;
  return curency;
};
