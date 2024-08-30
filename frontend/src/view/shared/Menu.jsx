import React, { useState, useEffect, useRef } from 'react';
import SideLinks from './components/SideLinks';
import SideDrawer from './components/SideDrawer';
import Backdrop from './UIElements/Backdrop';
import { CgMenuGridO } from "react-icons/cg";

import { TopNavlink } from '../../datas/MenuData';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { NavLink, useLocation } from 'react-router-dom';

const Menu = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [desktopOpenSubMenu, setDesktopOpenSubMenu] = useState(null);
    const menuRef = useRef(null);
    const location = useLocation();

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSubMenu = (index) => {
        if (openSubMenu === index) {
            setOpenSubMenu(null);
        } else {
            setOpenSubMenu(index);
        }
    };

    const toggleDesktopSubMenu = (index) => {
        if (desktopOpenSubMenu === index) {
            setDesktopOpenSubMenu(null);
        } else {
            setDesktopOpenSubMenu(index);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
                setOpenSubMenu(null);
                setDesktopOpenSubMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <SideLinks />
                </nav>
            </SideDrawer>

            <div className="w-[100%] text-black z-20 fixed bg-[#E0FFFF]" ref={menuRef}>
                <div className="flex justify-between items-center py-3 px-3 md:px-6">
                    <div className="flex justify-between items-center w-full">
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="text-black focus:outline-none">
                                <HiOutlineMenuAlt3 className='text-xl' />
                            </button>
                        </div>
                        <div className='flex justify-center items-center text-2xl text-gray-400 gap-3'>
                            <button
                                className="main-navigation__menu-btn"
                                onClick={openDrawerHandler}
                            >
                                <CgMenuGridO className="hidden md:block icons hover:text-gray-600" />
                            </button>
                            <div className='font-extrabold text-gray-300 text-2xl'><span className='text-gray-700 text-2xl'>Store</span>X</div>
                        </div>
                        <div className="nav-links cursor-pointer hidden md:flex items-center gap-2">
                            {
                                TopNavlink.map((data, index) => (
                                    <div key={index} className="relative">
                                        {
                                            data.id === 1 ? 
                                            <NavLink to={data.link}
                                                onClick={() => toggleDesktopSubMenu(index)}
                                                className={`main-navlink flex items-center gap-1 text-black border border-gray-300 rounded-full text-sm text-base px-3 p-2 hover:bg-gray-200 ${location.pathname === data.link ? 'bg-gray-200' : ''}`}
                                            >
                                                <div className='icon text-lg'>{data.icon}</div>
                                                <div>{data.title}</div>

                                                {data.subMenu && <FaChevronDown className={`ml-2 transition-transform ${desktopOpenSubMenu === index ? 'rotate-180' : 'rotate-0'}`} />}
                                            </NavLink> 
                                            :
                                                <button
                                                    onClick={() => toggleDesktopSubMenu(index)}
                                                    className={`main-navlink flex items-center gap-1 text-black border border-gray-300 rounded-full text-sm text-base px-3 p-2 hover:bg-gray-200 ${location.pathname === data.link ? 'bg-gray-200' : ''}`}
                                                >
                                                    <div className='icon text-lg'>{data.icon}</div>
                                                    <div>{data.title}</div>

                                                    {data.subMenu && <FaChevronDown className={`ml-2 transition-transform ${desktopOpenSubMenu === index ? 'rotate-180' : 'rotate-0'}`} />}
                                                </button>
                                        }
                                        {desktopOpenSubMenu === index && data.subMenu && (
                                            <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-[200px]">
                                                {data.subMenu.map((subData, subIndex) => (
                                                    <NavLink
                                                        to={subData.link}
                                                        key={subIndex}
                                                        className={`block py-2 px-4 text-black hover:bg-gray-200 ${location.pathname === subData.link ? 'bg-gray-200' : ''}`}
                                                    >
                                                        {subData.title}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <div className='p-2 border border-gray-300 hover:bg-gray-200 hover:border-gray-400 text-black rounded-full cursor-pointer'><FaBell /></div>
                        </div>
                    </div>
                </div>
                <div className={`absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden ${isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}>
                    <div className="rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                        {
                            TopNavlink.map((data, index) => (
                                <div key={index}>
                                    <button
                                        onClick={() => toggleSubMenu(index)}
                                        className={`flex items-center justify-between w-full text-left py-2 px-4 text-black hover:bg-gray-100 ${location.pathname === data.link ? 'bg-gray-200' : ''}`}
                                    >
                                        <span>{data.title}</span>
                                        {data.subMenu && <FaChevronDown className={`ml-2 transition-transform text-xs ${openSubMenu === index ? 'rotate-180' : 'rotate-0'}`} />}
                                    </button>
                                    {openSubMenu === index && data.subMenu && (
                                        <div className="pl-4">
                                            {data.subMenu.map((subData, subIndex) => (
                                                <NavLink
                                                    to={subData.link}
                                                    key={subIndex}
                                                    className={`block py-2 px-4 text-black hover:bg-gray-200 ${location.pathname === subData.link ? 'bg-gray-200' : ''}`}
                                                >
                                                    {subData.title}
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;
