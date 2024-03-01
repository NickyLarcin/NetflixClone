import React, { useCallback } from "react"

import NavbarItem from "./NavbarItem"
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

import { BsChevronCompactDown } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { FiBell } from "react-icons/fi";

const TOP_OFFSET : number  = 66;

const Navbar = () => {

    const [showMobileMenu, setShowMobileMenu] = React.useState(false)
    const [showAccountMenu, setShowAccountMenu] = React.useState(false)
    const [showBackground, setShowBackground] = React.useState(false)


    React.useEffect(()=>{

        const handleScroll = () => {
        if(window.scrollY >= TOP_OFFSET){
            setShowBackground(true)
        } else {
            setShowBackground(false)
        }
    }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    },[])

    
    const toggleMobileMenu = React.useCallback(()=>{
        setShowMobileMenu(current => !current)
    },[])

    
    const toggleAccountMenu = React.useCallback(()=>{
        setShowAccountMenu(current => !current)
    },[])

    return (
        <nav className="w-full fixed z-40">
            <div className={`
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
           
            ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}

            `}>
                <img src="./images/parodyLogo.png" className="h-10 lg:h-16"></img>
                <div className="
                flex-row
                ml-8
                gap-8
                hidden
                lg:flex">
                    <NavbarItem label ="Home"/>
                    <NavbarItem label ="Series"/>
                    <NavbarItem label ="Films"/>
                    <NavbarItem label ="New & Popular"/>
                    <NavbarItem label ="My List"/>
                    <NavbarItem label ="Browse by languages"/>
                </div>
                <div onClick={()=>{toggleMobileMenu()}} 
                className="
                lg:hidden
                flex 
                flex-row
                items-center
                gap-2
                ml-8
                cursor-pointer
                relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronCompactDown className={`text-white transition ${showMobileMenu ? "rotate-180"
                        : "rotate-0"}`}/>
                    <MobileMenu 
                    visible = {showMobileMenu}/>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-400 cursor-pointer">
                        <IoSearchOutline />
                    </div>
                    <div className="text-gray-200 hover:text-gray-400 cursor-pointer">
                        <FiBell />

                    </div>
                    <div onClick={()=>{toggleAccountMenu()}}className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="./images/default-red.png"></img>
                        </div>
                        <BsChevronCompactDown className={`text-white transition ${showAccountMenu ? "rotate-180"
                        : "rotate-0"}`}/>
                        <AccountMenu 
                        visible = {showAccountMenu}/>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar