import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import userPlaceholder from "../assets/userPlaceholder.png";
import logo from "../assets/logo.png"
function Header() {
    const [path, setPath] = useState("");
    useEffect(() => {
        setPath(window.location.pathname);
    }, []);
    return (
        <div className="w-full border flex justify-between">
            <a href="/"><img src={logo} alt="" className='h-13 w-auto' /></a>
            <div className='flex border p-2 gap-4 justify-end'>
                <ul className='gap-5 s:hidden md:hidden lg:flex'>
                    <li><a href="/shows">Shows</a></li>
                    <li><a href="/movies">Movies</a></li>
                </ul>
                <div className='relative border lg:hidden'>
                    <button className="p-2 bg-black text-white rounded-full">
                        <Bars3Icon className="h-6" />
                    </button>
                    <div className='absolute end-0 border'>
                        <ul>
                            <li><a href="/shows">Shows</a></li>
                            <li><a href="/movies">Movies</a></li>
                        </ul>
                    </div>
                </div>
                <div className='relative border'>
                    <button className="p-2 bg-black text-white rounded-full">
                        <UserIcon className="h-6" />
                    </button>
                    <div className='absolute end-0 border'>
                        <ul>
                            <li><a href="/shows">Login</a></li>
                            <li><a href="/movies">Signup</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;