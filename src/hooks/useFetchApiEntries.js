import { useEffect, useState } from 'react';
import jsonData from '../entries.json';

export const useFetchApiEntries = () => {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // const results = await fetch('https://api.publicapis.org/entries');
      // const data = await results.json();
      // setApiData(data.entries)
      const data = jsonData.entries; //.slice(0, 20);
      setApiData(data);
    };
    fetchData();
  }, []);
  return apiData;
};
