import { useEffect, useState } from 'react';

export const useFetchApiEntries = () => {
  const [{ apiData, isLoading, error }, setApiData] = useState({
    apiData: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setApiData(state => ({ ...state, isLoading: true, error: null }));
      try {
        const results = await fetch('https://api.publicapis.org/entries');
        const data = await results.json();
        setApiData({ apiData: data.entries, isLoading: false, error: null });
      } catch (error) {
        console.error(error);
        setApiData(state => ({ ...state, isLoading: false, error }));
      }
    };
    fetchData();
  }, []);

  return [apiData, isLoading, error];
};
