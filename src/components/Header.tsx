"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "../../constants";
import { NavLink } from "../../types";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

export default function Header() {
    const [isToggle, setIsToggle] = useState(false);

    return (
        <header className="flex text-white font-normal md:flex justify-between md:py-10 md:px-75 p-10">
            <Image
                src={"/logo.png"}
                alt="Logo"
                height={100}
                width={200}
            />
            <div className="md:flex hidden justify-around items-center text-2xl space-x-15">
                <nav className="flex items-center justify-around space-x-15">
                    {navLinks && navLinks.map((value: NavLink, index: number) => 
                        <Link href={value.link} key={index}>
                            {value.name}
                        </Link>
                    )}
                </nav>
                <button className="bg-blue-600 rounded-2xl px-10 py-3">
                    Login
                </button>
            </div>
            <div className="flex relative">
               {!isToggle && 
                <HiMenuAlt4 size={35} className="z-11 md:hidden cursor-pointer" onClick={() => setIsToggle(true)}/> 
                }
                {isToggle &&
                    <AiOutlineClose size={35} className="z-11 md:hidden cursor-pointer" onClick={() => setIsToggle(false)}/> 
                }
                {isToggle &&
                    <aside
                        className="z-10 fixed -top-0 -right-2 px-10 py-25 w-[60vw] h-screen text-3xl shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                        {navLinks && navLinks.map((value: NavLink, index: number) => 
                            <Link href={value.link} key={index}>
                                {value.name}
                            </Link>
                        )}
                    </aside>
                } 
            </div>
            
        </header>
    )
}