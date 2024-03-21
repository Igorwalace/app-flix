import React, { useEffect, useState } from 'react';

export default function LocalStorage({ list: initialList, setList }) {
  const [list, setLocalList] = useState(initialList || []);
5
6  useEffect(() => {
7    const storedList = localStorage.getItem('list');
8    if (storedList) {
9      const newList = JSON.parse(storedList);
10      if (Array.isArray(newList)) {
11        setLocalList(newList);
12      }
13    }
14  }, [initialList]);
15
16  useEffect(() => {
17    localStorage.setItem('list', JSON.stringify(list));
18  }, [list]);
19
20  useEffect(() => {
21    setList(list);
22  }, [list]);

  return null;
}