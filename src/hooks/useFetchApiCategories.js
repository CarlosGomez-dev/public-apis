import { useEffect, useState } from 'react';

export const useFetchApiCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetch('https://api.publicapis.org/categories');
      const data = await results.json();
      setCategories(data);
    };
    fetchData();
  }, []);

  return categories;
};
