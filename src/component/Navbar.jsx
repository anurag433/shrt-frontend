import React from 'react'
import logo from "../assets/Logo/logo.png"
function Navbar() {
    return (
        <div className='px-8 py-5'>
           <img 
           src={logo} 
           alt="logo" 
           className='h-12 sm:h-10 md:h-12  lg:h-20 object-contain'
           />
        </div>
    )
}

export default Navbar
