'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearchSharp } from 'react-icons/io5';
import { MdOutlineExpandMore } from 'react-icons/md';
import { FaList } from 'react-icons/fa6';
import Search from './search';
import List from './List';

const Header = ({ setModalList, n, setN }) => {
    const handleSearch = () => {
        setN(true);
    };
    const handleClear = () => {
        setModalList(false);
        setN(false);
    };

    return (
        <main>
            <Search n={n} setN={setN} />
            <List />
            <header className="flex justify-between items-center bg-black p-3 px-[4%] absolute top-0 left-0 right-0">
                <nav className="flex justify-center items-center gap-12">
                    <Link
                        href="https://www.instagram.com/igor_walace/"
                        target="_blank"
                    >
                        <Image src="/logo.png" height={70} width={90} />
                    </Link>
                    <ul className="flex text-white gap-5" id="ul-header">
                        <li
                            className="cursor-pointer text-slate-300 hover:text-white"
                            onClick={handleClear}
                        >
                            Início
                        </li>
                        <li
                            className="cursor-pointer text-slate-300 hover:text-white"
                            id="lista"
                            onClick={() => setModalList(true)}
                        >
                            Minha lista
                        </li>
                    </ul>
                </nav>
                <nav className="flex justify-center items-center">
                    <IoSearchSharp
                        onClick={() => handleSearch()}
                        size={30}
                        id="search"
                        className="text-white cursor-pointer"
                    />
                    <FaList
                        size={30}
                        className="text-white cursor-pointer mx-4"
                        onClick={() => setModalList(true)}
                    />
                    <h1 className="bg-white rounded-[20%] w-9 h-9 cursor-pointer"></h1>
                    <MdOutlineExpandMore className="text-white ml-[1px] cursor-pointer" />
                </nav>
            </header>
        </main>
    );
};

export default Header;
