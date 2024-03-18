'use client'
import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Search1 = ({ n, setN }) => {
    const [termoBusca, setTermoBusca] = useState('');
    const [info, setInfo] = useState([]);
    const [img, setImg] = useState('https://image.tmdb.org/t/p/w500');
    const [infoSingle, setInfoSingle] = useState([]);
    const [modal, setModal] = useState(false);
    const [page, setPage] = useState(1);
    const [ok, setOk] = useState(false)

    const Authorization = process.env.NEXT_PUBLIC_AUTHORIZATION;
    const Api_Key = process.env.NEXT_API_KEY;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `${Authorization}`,
        },
    };

    useEffect(() => {
        if(termoBusca){
            fetch(
                `https://api.themoviedb.org/3/search/movie?api_key${Api_Key}&query=${termoBusca}&page=${page}`,
                options
            )
                .then((response) => response.json())
                .then((response) => {
                    setInfo(response.results);
                })
                .catch((err) => alert(err));
        } else{
            fetch(
                `https://api.themoviedb.org/3/trending/all/week?page=${page}`,
                options
            )
                .then((response) => response.json())
                .then((response) => {
                    setInfo(response.results);
                })
                .catch((err) => alert(err));
        }
    }, [termoBusca, page]);

    useEffect(()=>{
        if(n){
            document.querySelector('body').style.overflow = 'hidden';
            document.getElementById('search').style.display = 'none'
        }
        if(!n){
            document.querySelector('body').style.overflow = 'auto';
            document.getElementById('search').style.display = 'block'
        }
    },[n])

    const handleId = (id) => {
        fetchDetails(id)
        setModal(!modal);
        setOk(true)
    }
    const fetchDetails = async (id) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}`,
                options
            );
            const details = await response.json();
            setInfoSingle(details);
        } catch (err) {
            alert(err);
        }
    };
    
    const handleChangePage1 = () => {
        if (page === 1) {
            document.getElementById('button-back').style.color = '#ccc';
            return;
        }
        if (page > 1) {
            document.getElementById('button-back').style.color = 'black';
        }
        setPage(page - 1);
    };
    const handleChangePage = () => {
        setPage(page + 1);
    };

    return (
        <main>
            {n && (
                <div className="absolute top-[70px] left-0 right-0 bottom-0 bg-black overflow-x-auto ">
                    <form className="p-1 my-3">
                        <h1 onClick={() => setN(!n)} className='p-1 rounded-md text-white absolute top-[16px] left-0 ml-[10px] cursor-pointer' ><FaArrowLeft size={25} /></h1>
                        <input
                            type="search"
                            className="outline-none capitalize bg-red-600 p-2 rounded-lg placeholder:text-[14px] placeholder:text-white text-white"
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                            placeholder="Digite o título do filme "
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
                                        className="py-1 px-4 text-white bg-yellow-600 rounded-xl w-[100%]"
                                        onClick={() => handleId(info.id)}
                                    >
                                        Detalhes
                                    </button>
                                </div>
                            ))}
                        </div>
                    </ul>
                    <div className="flex flex-wrap justify-center gap-2 mr-5 px-[4%]">
                <button
                    id="button-back"
                    onClick={handleChangePage1}
                    style={{
                        backgroundColor:
                            page === 1 ? 'rgb(107, 107, 107)' : 'white',
                        cursor: page === 1 ? 'auto' : '',
                    }}
                    className="text-black bg-white p-1 mb-2 rounded-md"
                >
                    <FaArrowLeft />
                </button>
                <h1 className="text-black bg-white px-3 py-2 mb-2 rounded-md cursor-none">
                    {page}
                </h1>
                <button
                    onClick={handleChangePage}
                    className="text-black bg-white p-1 mb-2 rounded-md"
                >
                    <FaArrowRight />
                </button>
            </div>
                </div>
                
            )}
            <Movie
                setModal={setModal}
                modal={modal}
                setInfoSingle={setInfoSingle}
                infoSingle={infoSingle}
                img={img}
                setOk={setOk}
                ok={ok}
            />
        </main>
    );
};

export default Search1;