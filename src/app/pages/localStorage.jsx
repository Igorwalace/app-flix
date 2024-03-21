import React, { useEffect } from 'react';

export default function LocalStorage({list, setList}) { 
  useEffect(() => { 
    if (typeof localStorage == 'undefined') { 
      const newList = JSON.parse(localStorage.getItem('list')); 
      setList(newList); 
    } 
  }, []);
  1useEffect(() => {
2    localStorage.setItem('list', JSON.stringify(list));
3}, [list]);
4
5return null;
}