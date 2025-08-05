import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface NavLink {
    name: string,
    link: string
}

export default function Header() {
    const navLinks: NavLink[] = [
        {
            name: "Market",
            link: "/market"
        },
        {
            name: "Exchange",
            link: "/exchange"
        },
        {
            name: "Tutorials",
            link: "/tutorials"
        },
        {
            name: "Wallets",
            link: "/wallets"
        },
    ];

    return (
        <header className="text-white font-normal flex justify-between py-10 px-75 z-0">
            <Image
                src={"/logo.png"}
                alt="Logo"
                height={100}
                width={200}
            />
            <div className="flex items-center space-x-15 text-2xl">
                <nav className="flex items-center space-x-15">
                    {navLinks && navLinks.map((value: NavLink, index: number) => 
                        <Link href={value.link} key={index}>
                            {value.name}
                        </Link> as ReactNode
                    )}
                </nav>
                <button className="bg-blue-600 rounded-2xl px-10 py-3">
                    Login
                </button>
            </div>
        </header>
    )
}