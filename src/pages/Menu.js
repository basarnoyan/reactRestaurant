import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Resim dosyalarını import et
import klasik from "../assets/klasik-burger.jpg";
import special from "../assets/Chefs-Special-Burger.jpg";
import cheese from "../assets/Cheese-Burger.jpg";
import paris from "../assets/Cafê-de-paris.jpg";
import bub from "../assets/black-burger.jpg";
import bbq from "../assets/Barbeque-Burger.jpg";
import cola from "../assets/cola1.png";
import fusetea1 from "../assets/fusetea.png";
import limon from "../assets/limon.png";
import seftali from "../assets/seftali.png";
import sprite from "../assets/sprite.png";
import su from "../assets/su.png";
import sufle from "../assets/381_cikolatali-sufle_2.jpg";
import magnolia from "../assets/475_magnolia_2.jpg";
import waffle from "../assets/482_waffle_2.jpg";

const imageMap = {
  "klasik-burger.jpg": klasik,
  "Chefs-Special-Burger.jpg": special,
  "Cheese-Burger.jpg": cheese,
  "Cafê-de-paris.jpg": paris,
  "black-burger.jpg": bub,
  "Barbeque-Burger.jpg": bbq,
  "cola1.png": cola,
  "fusetea.png": fusetea1,
  "limon.png": limon,
  "seftali.png": seftali,
  "sprite.png": sprite,
  "su.png": su,
  "381_cikolatali-sufle_2.jpg": sufle,
  "475_magnolia_2.jpg": magnolia,
  "482_waffle_2.jpg": waffle
};

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Veritabanından menü verilerini çekmek için API isteği yap
    axios.get('http://localhost:3300/menu')
      .then(response => {
        setMenuItems(response.data); // Verileri state'e kaydet
      })
      .catch(error => {
        console.error('Error fetching menu data', error);
      });
  }, []);

  const handleButtonClick = (menuItem) => {
    // Ürünü sepete ekle ve sepet sayfasına yönlendir
    axios.post('http://localhost:3300/cart', {
      name: menuItem.name,
      image: menuItem.image,
      price: menuItem.price
    })
    .then(() => {
      navigate('/cart');
    })
    .catch(error => {
      console.error('Error adding item to cart', error);
    });
  };

  return (
    <div className='menu'>
      <h1 className='menuTitle'>MENU</h1>
      <div className='menuList'>
        {/* Menü öğelerini ekranda liste halinde göster */}
        {menuItems.map((menuItem, key) => (
          <button 
            className='menuItem' 
            key={key}
            onClick={() => handleButtonClick(menuItem)}
          >
            <div>
              {/* Resim elementinin src özniteliğini veritabanından gelen image path ile doldur */}
              <img src={imageMap[menuItem.image]} alt={menuItem.name} />
            </div>
            <h3>{menuItem.name}</h3>
            <p>{menuItem.price} TL</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Menu;
