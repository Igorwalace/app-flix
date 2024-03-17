'use client';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../../styles/Home.css';
import Movie from './Movie';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Home = () => {
    const [info, setInfo] = useState([]);
    const [infoSingle, setInfoSingle] = useState([]);
    const [img, setImg] = useState('https://image.tmdb.org/t/p/w500');
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState(false);

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
            `https://api.themoviedb.org/3/trending/all/week?page=${page}`,
            options
        )
            .then((response) => response.json())
            .then((response) => {
                setInfo(response.results), console.log(response);
            })
            .catch((err) => console.error(err));
    }, [page]);

    const handleChangePage = () => {
        setPage(page + 1);
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

    const handleId = (id) => {
        fetchDetails(id);
        setModal(!modal);
    };
    const fetchDetails = async (id) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}`,
                options
            );
            const details = await response.json();
            setInfoSingle(details);
            console.log(details);
        } catch (err) {
            console.error(err);
        }
    };
    const handleAddlist = (id) => {

    }
    
    useEffect(()=>{
        if(modal){
            document.querySelector('body').style.overflow = 'hidden';
        }
        if(!modal){
            document.querySelector('body').style.overflow = 'auto';
        }
    },[modal])

    return (
        <main className="text-center mt-[65px] bg-black">
            <Header setModal={setModal} modal={modal} />
            
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
                            onClick={() => handleAddlist(info.id)}
                        >
                            Adicionar a Minha Lista
                        </button>
                        <button
                            className="py-1 px-4 text-white bg-yellow-600 rounded-xl w-[100%]"
                            onClick={() => handleId(info.id)}
                        >
                            Detalhes
                        </button>
                    </div>
                ))}
            </div>

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

            <Movie
                setModal={setModal}
                modal={modal}
                setInfoSingle={setInfoSingle}
                infoSingle={infoSingle}
                img={img}
            />
        </main>
    );
};

export default Home;
