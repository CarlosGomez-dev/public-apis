import { useEffect, useState } from 'react';

const PUBLIC_API_URL = 'https://api.publicapis.org/';

export const useFetchPublicApi = endpoint => {
  const [{ data, isLoading, error }, setData] = useState({
    data: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const fetchPublicApi = async () => {
      setData(state => ({ ...state, isLoading: true, error: null }));
      try {
        const response = await fetch(PUBLIC_API_URL + endpoint);
        const data = await response.json();
        setData({
          data: data?.entries ?? data.categories ?? data,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error(error);
        setData(state => ({ ...state, isLoading: false, error }));
      }
    };
    fetchPublicApi();
  }, [endpoint]);

  return [data, isLoading, error];
};
