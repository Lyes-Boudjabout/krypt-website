import Image from "next/image";
import Link from "next/link";
import { navLinks } from "../../constants";
import { NavLink } from "../../types";

export default function Footer() {
    return (
        <footer className="gradient-bg-footer text-white py-10 px-30 space-y-5">
            <div className="flex justify-between items-center">
                <Image
                    src={"/logo.png"}
                    alt="Krypt"
                    height={120}
                    width={240}
                />
                <div className="flex text-xl space-x-30">
                    {navLinks.map((element: NavLink, index: number) => 
                        <Link href={element.link} key={index}>
                            {element.name}
                        </Link>    
                    )}
                </div>
            </div>
            <div className="text-center">
                <p>Come join us and hear for the unexpected miracle</p>
                <p>nl_boudjabout@esi.dz</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Github: <a href="https://github.com/Lyes-Boudjabout" target="_blank">@Lyes-Boudjabout</a></p>
                <p>All rights reserved</p>
            </div>
        </footer>
    )
}