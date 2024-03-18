'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearchSharp, IoNotificationsOutline } from 'react-icons/io5';
import { MdOutlineExpandMore } from 'react-icons/md';
import Search from './search';

const Header = () => {
    const [n, setN] = useState(false);

    const handleSearch = () => {
        setN(true);
    };

    return (
        <main>
            <Search n={n} setN={setN} />
            <header className="flex justify-between items-center bg-black p-3 px-[4%] absolute top-0 left-0 right-0">
                <nav className="flex justify-center items-center gap-12">
                    <Link href='https://www.instagram.com/igor_walace/' target='_blank' ><Image src="/logo.png" height={70} width={90} /></Link>
                    <ul className="flex text-white gap-5" id="ul-header">
                        <li className="cursor-pointer text-slate-300 hover:text-white">
                            Início
                        </li>
                        <li className="cursor-pointer text-slate-300 hover:text-white">
                            Série
                        </li>
                        <li className="cursor-pointer text-slate-300 hover:text-white">
                            Filmes
                        </li>
                        <li
                            className="cursor-pointer text-slate-300 hover:text-white"
                        >
                            Minha lista
                        </li>
                    </ul>
                </nav>
                <nav className="flex justify-center items-center">
                    <IoSearchSharp
                        onClick={() => handleSearch()}
                        size={30}
                        id='search'
                        className="text-white cursor-pointer"
                    />
                    <IoNotificationsOutline
                        size={30}
                        className="text-white cursor-pointer mx-4"
                    />
                    <h1 className="bg-white rounded-[20%] w-9 h-9 cursor-pointer"></h1>
                    <MdOutlineExpandMore className="text-white ml-[1px] cursor-pointer" />
                </nav>
            </header>
            
        </main>
    );
};

export default Header;
