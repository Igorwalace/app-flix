import React, { useEffect } from 'react';

export default function LocalStorage({ list: initialList, setList }) {
  const [list, setLocalList] = useState(initialList || []);

  useEffect(() => {
    const storedList = localStorage.getItem('list');
    if (storedList) {
      setLocalList(JSON.parse(storedList));
    }
  }, [initialList]);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    setList(list);
  }, [list]);

  return null;
}