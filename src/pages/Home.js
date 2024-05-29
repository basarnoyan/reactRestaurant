import React from 'react'
import {Link} from "react-router-dom";
import BannerImage from "../assets/banner2.jpeg"
function Home() {
  return (
    <div className='home'  style={{backgroundImage: `url(${BannerImage})`}}>
      <div className='headerContainer'>
        <h1>BAGBURGER</h1>
        <p>Bambaşka Bir Lezzet <br/> Özel BAG Baharatları ile Harmanlandı</p>
        <Link to="/menu">
        <button>Sipariş Ver</button>
        </Link>
      </div>
    </div>
  )
}

export default Home