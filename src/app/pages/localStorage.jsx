import React, { useEffect } from 'react';

export default function LocalStorage({ list, setList }) {
    useEffect(() => {
        if (typeof localStorage == 'undefined') {
            const newList = JSON.parse(localStorage.getItem('list'));
            setList(newList);
        }
    }, []);
    useEffect(()=>{
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])
}
