import React from 'react';
import { PiStarBold } from 'react-icons/pi';
import Link from 'next/link';

const Movie = ({ modal, setModal, infoSingle, img }) => {

    return (
        <main>
            {modal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0)] flex justify-center items-center z-10">
                    <div
                        id="container-info-single"
                        className="max-w-[400px] h-[100%] p-1 flex flex-col items-center justify-between gap-3"
                    >
                        {infoSingle.poster_path ? (
                            <div
                                style={{
                                    backgroundImage: `url(${img}${infoSingle.poster_path})`,
                                }}
                                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] right-0 bottom-0 opacity-30 z-[-10] w-[400px] h-[100%]"
                                id="container-background-image"
                            ></div>
                        ) : (
                            <div
                                style={{
                                    backgroundColor: 'red',
                                }}
                                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] right-0 bottom-0 opacity-20 z-[-10] w-[400px] h-[100%]"
                                id="container-background-image"
                            ></div>
                        )}

                        <div>
                            <h1 className="text-[20px] text-white capitalize">
                                Título original:{' '}
                                <span className="font-normal">
                                    {infoSingle.original_title}
                                </span>
                            </h1>
                            <h1 className="text-white capitalize">
                                Ano de lançamento: {infoSingle.release_date}
                            </h1>
                        </div>
                        <div>
                            {infoSingle.original_language ? <h1 className="text-white  capitalize">
                                Lingugem oficial: {infoSingle.original_language}
                            </h1> : <h1 className="text-white  capitalize">
                                Lingugem oficial: Sem Linguagem Oficial
                            </h1>

                            }
                            
                            {infoSingle.overview ? <p className="text-base max-w-[400px] bg-[rgb(255,255,255)] text-[14px] text-black rounded-lg my-2 p-2">
                                Sinopse: {infoSingle.overview}
                            </p> : <p className="text-base max-w-[400px] bg-[rgb(255,255,255)] text-[14px] text-black rounded-lg my-2 p-2">
                                Sinopse: Sem Sinopse
                            </p>}
                            <h1 className="text-white capitalize z-50 underline">
                                <Link href={`${infoSingle.homepage}`} target='_blank'>
                                    Pagina oficial
                                </Link>
                            </h1>
                        </div>
                        <div>
                            <h1 className="text-white capitalize flex justify-center items-center gap-2">
                                <PiStarBold size={20} />{' '}
                                {infoSingle.vote_average}
                            </h1>
                            <button onClick={() => setModal(!modal)} className="bg-red-600 w-[100%] m-1 p-1 rounded-md">
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Movie;
