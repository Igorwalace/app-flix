import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const List = ({ list, setList, modalList, setModalList }) => {
    const [img, setImg] = useState('https://image.tmdb.org/t/p/w500');

    useEffect(() => {
        if (modalList) {
            document.querySelector('body').style.overflow = 'hidden';
        }
        if (!modalList) {
            document.querySelector('body').style.overflow = 'auto';
        }
    }, [modalList]);

    const handleId = (id) => {
        const filter = list.filter((user) => user.id !== id);
        setList(filter);
    };
    
    useEffect(() => {
        const listV = JSON.parse(localStorage.getItem('list2'));
        if (listV) {
          setList(listV); // Update state with data from localStorage if available
        }
    }, []);

  // Save list to localStorage whenever the list state changes
      useEffect(() => {
        localStorage.setItem('list2', JSON.stringify(list));
     }, [list]);

    return (
        <main>
            {modalList && (
                <main className="absolute top-[70px] left-0 right-0 bottom-0 bg-black px-[4%] overflow-x-auto">
                    <div className="text-center">
                        <h1
                            onClick={() => setModalList(!modalList)}
                            className="p-1 rounded-md text-white absolute top-[3px] left-0 ml-[10px] cursor-pointer"
                        >
                            <FaArrowLeft size={25} />
                        </h1>
                        <h1
                            className="text-black text-2xl font-bold bg-yellow-500  p-1 rounded-md"
                            id="h1-list"
                        >
                            Minha Lista
                        </h1>
                        <div className="flex flex-wrap justify-around gap-2 px-[4%] py-[1%]">
                            {list.map((info) => (
                                <div
                                    className="text-center border-black border-2 bg-red-600 rounded-2xl p-1 flex flex-col items-center"
                                    id="container-img"
                                    key={info.id}
                                >
                                    <img
                                        src={`${img}${info.homepage}`}
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
                                        className="py-1 px-4 text-white bg-yred-500 bg-black rounded-xl w-[100%]"
                                        onClick={() => handleId(info.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            )}
        </main>
    );
};

export default List;
