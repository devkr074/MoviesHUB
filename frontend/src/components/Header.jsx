import React, { useState,useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import userPlaceholder from "../assets/userPlaceholder.png";
import logo from "../assets/logo.png"

export default function Header() {
    const [path,setPath]=useState("");
    useEffect(()=>{
        const path=window.location.pathname;
        setPath(path);
    },[]);
    return (
        <Disclosure as="nav" className="sticky top-0 z-40 bg-black backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            
                            <a href="/">
                            <img
                                alt="Your Company"
                                src={logo}
                                className="h-12 w-auto"
                            /></a>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex items-center h-12 space-x-4">
                                <a
                                    href="/shows"
                                    aria-current={path.includes("/shows") ? "page" : undefined}
                                    className={path.includes("/shows") ? "bg-purple text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}
                                >
                                    Shows
                                </a>
                                <a
                                    href="/movies"
                                    aria-current={path.includes("/movies") ? "page" : undefined}
                                    className={path.includes("/movies") ? "bg-purple text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}
                                >
                                    Movies
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full border-2 border-purple p-0.5 bg-black text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt="User Profile"
                                        src={userPlaceholder}
                                        className="size-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <MenuItem>
                                    <a
                                        href="/login"
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                    >
                                        Login
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                    >
                                        Signup
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    <DisclosureButton
                        as="a"
                        href="/shows"
                        aria-current={path.includes("/shows") ? "page" : undefined}
                        className={path.includes("/shows") ? "bg-purple text-white block rounded-md px-3 py-2 text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}  
                    >
                        Shows
                    </DisclosureButton>
                    <DisclosureButton
                        as="a"
                        href="/movies"
                        aria-current={path.includes("/movies") ? "page" : undefined}
                        className={path.includes("/movies") ? "bg-purple text-white block rounded-md px-3 py-2 text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}  
                    >
                        Movies
                    </DisclosureButton>
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
