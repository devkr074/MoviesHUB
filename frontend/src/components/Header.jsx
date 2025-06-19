import { useState, useEffect } from "react";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png"
function Header() {
    const [path, setPath] = useState("");
    useEffect(() => {
        setPath(window.location.pathname);
    }, []);
    return (
        <div className="w-full border flex justify-between px-2 items-center fixed bg-[#000000CC] backdrop-blur-xs">
            <a href="/"><img src={logo} alt="" className="h-12" /></a>
            <div className="flex p-2 gap-2 justify-end">
                <ul className="flex items-center gap-5 text-white font-bold hidden lg:flex">
                    <li><a className="hover:text-[#9F42C6]" href="/shows">Shows</a></li>
                    <li><a className="hover:text-[#9F42C6]" href="/movies">Movies</a></li>
                </ul>
                <div className="relative block lg:hidden group">
                    <button className="rounded-t-lg p-2 text-white peer group-hover:bg-white group-hover:text-black">
                        <Bars3Icon className="h-6 font-bold" />
                    </button>
                    <div className="w-[120px] border-t border-[#9F42C6] rounded-b-lg rounded-tl-lg py-2 absolute bg-white end-0 hidden peer-hover:block hover:block">
                        <ul>
                            <li><a className="w-full block px-2 py-1 font-semibold hover:bg-[#9F42C6] hover:text-white" href="/shows">Login</a></li>
                            <li><a className="w-full block px-2 py-1 font-semibold hover:bg-[#9F42C6] hover:text-white" href="/shows">Signup</a></li>
                        </ul>
                    </div>
                </div>
                <div className="relative group">
                    <button className="rounded-t-lg p-2 text-white peer group-hover:bg-white focus:bg-white group-active:bg-white group-hover:text-black">
                        <UserIcon className="h-6 font-bold" />
                    </button>
                    <div className="w-[120px] border-t border-[#9F42C6] rounded-b-lg rounded-tl-lg py-2 absolute bg-white end-0 hidden peer-hover:block peer-focus:block hover:block">
                        <ul>
                            <li><a className="w-full block px-2 py-1 font-semibold hover:bg-[#9F42C6] hover:text-white active:bg-[#9F42C6] active:text-white" href="/shows">Login</a></li>
                            <li><a className="w-full block px-2 py-1 font-semibold hover:bg-[#9F42C6] hover:text-white" href="/shows">Signup</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;