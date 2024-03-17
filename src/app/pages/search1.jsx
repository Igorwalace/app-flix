'use client'
import { FaArrowLeft } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

const Search1 = ({ n, setN }) => {
    const [termoBusca, setTermoBusca] = useState('');
    const [info, setInfo] = useState([]);
    const [img, setImg] = useState('https://image.tmdb.org/t/p/w500');

    const Authorization = process.env.NEXT_PUBLIC_AUTHORIZATION;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `${Authorization}`,
        },
    };

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=e80fe624c24f9dc91a299d8440f739da&query=${termoBusca}`,
            options
        )
            .then((response) => response.json())
            .then((response) => {
                setInfo(response.results);
            })
            .catch((err) => console.error(err));
    }, [termoBusca]);

    if (n) {
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
    }
    if (!n) {
        const body = document.querySelector('body');
        body.style.overflow = 'auto';
    }

    return (
        <main>
            {n && (
                <div className="absolute top-[70px] left-0 right-0 bottom-0 bg-black overflow-y-auto">
                    <form className="p-1 my-3">
                        <h1 onClick={() => setN(!n)} className='p-1 rounded-md text-white absolute top-[16px] left-0 ml-[10px]' ><FaArrowLeft size={25} /></h1>
                        <input
                            type="search"
                            className="outline-none bg-red-600 p-2 rounded-lg placeholder:text-[14px] placeholder:text-white text-white"
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                            placeholder="Digite o título do filme"
                        />
                    </form>
                    <ul>
                        <div className="flex flex-wrap justify-around gap-2 px-[4%] py-[1%]">
                            {info.map((info) => (
                                <div
                                    className="text-center border-black border-2 bg-red-600 rounded-2xl p-1 flex flex-col items-center"
                                    id="container-img"
                                    key={info.id}
                                >
                                    <img
                                        src={`${img}${info.poster_path}`}
                                        id="img"
                                        className="cursor-pointer rounded-xl"
                                        height="auto"
                                        width="auto"
                                    />
                                    {info.title ? (
                                        <h1 className="my-2">{info.title}</h1>
                                    ) : (
                                        <h1 className="my-2">Sem título</h1>
                                    )}
                                    <button
                                        className="py-1 px-4 text-white mb-1 bg-blue-950 rounded-xl w-[100%]"
                                        onClick={() => {}}
                                    >
                                        Adicionar a Minha Lista
                                    </button>
                                    <button
                                        className="py-1 px-4 text-white bg-yellow-600 rounded-xl w-[100%]"
                                        onClick={() => {}}
                                    >
                                        Detalhes
                                    </button>
                                </div>
                            ))}
                        </div>
                    </ul>
                </div>
            )}
        </main>
    );
};

export default Search1;