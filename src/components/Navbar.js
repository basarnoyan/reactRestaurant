import React from 'react'
import Logo from "../assets/BEGBURGER.png";
import {Link} from "react-router-dom";
import { ShoppingCart } from 'phosphor-react';

function Navbar() {
  return (
    <div className='navbar'>
        <div className='leftSide'>
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
            <Link to="/cart">
              <ShoppingCart size={50}/>
            </Link>
        </div>
        <div className='rightSide'>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
        </div>
    </div>
  )
}

export default Navbar