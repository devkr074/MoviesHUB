import { useState, useEffect } from "react";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png"
function Header() {
    const [path, setPath] = useState("");
    useEffect(() => {
        setPath(window.location.pathname);
    }, []);
    return (
        <div className="w-full flex items-center justify-between bg-[#000000CC] backdrop-blur-xs sticky top-0 p-2">
            <a href="/"><img src={logo} alt="MoviesHUB Logo" className="h-12" /></a>
            <div className="flex gap-1">
                <ul className="hidden items-center gap-5 px-4 lg:flex">
                    <li><a href="/shows" className={`font-semibold hover:text-[#9F42C6] ${path == "/shows" ? "text-[#9F42C6]" : "text-white"}`}>Shows</a></li>
                    <li><a href="/movies" className={`font-semibold hover:text-[#9F42C6] ${path == "/movies" ? "text-[#9F42C6]" : "text-white"}`}>Movies</a></li>
                </ul>
                <div className="group block relative lg:hidden">
                    <button className="peer rounded-t-lg text-white p-2 group-hover:bg-white group-hover:text-black focus:bg-white focus:text-black group-focus:bg-white group-focus:text-black">
                        <Bars3Icon className="h-6" />
                    </button>
                    <div className="w-[120px] hidden bg-white border-t border-[#9F42C6] rounded-tl-lg rounded-b-lg absolute end-0 py-2 hover:block peer-hover:block focus:block peer-focus:block">
                        <ul>
                            <li><a href="/shows" className="block font-semibold px-2 py-1 hover:bg-[#9F42C6] hover:text-white active:bg-[#9F42C6] active:text-white">Shows</a></li>
                            <li><a href="/movies" className="block font-semibold px-2 py-1 hover:bg-[#9F42C6] hover:text-white active:bg-[#9F42C6] active:text-white">Movies</a></li>
                        </ul>
                    </div>
                </div>
                <div className="group relative">
                    <button className="peer rounded-t-lg text-white p-2 group-hover:bg-white group-hover:text-black focus:bg-white focus:text-black group-focus:bg-white group-focus:text-black">
                        <UserIcon className="h-6" />
                    </button>
                    <div className="w-[120px] hidden bg-white border-t border-[#9F42C6] rounded-tl-lg rounded-b-lg absolute end-0 py-2 hover:block peer-hover:block focus:block peer-focus:block">
                        <ul>
                            <li><a href="/login" className="block font-semibold px-2 py-1 hover:bg-[#9F42C6] hover:text-white active:bg-[#9F42C6] active:text-white">Login</a></li>
                            <li><a href="/signup" className="block font-semibold px-2 py-1 hover:bg-[#9F42C6] hover:text-white active:bg-[#9F42C6] active:text-white">Signup</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;