import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);

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

  return (
    <div className='menu'>
      <h1 className='menuTitle'>BURGERLER</h1>
      <div className='menuList'>
        {/* Menü öğelerini ekranda liste halinde göster */}
        {menuItems.map((menuItem, key) => (
          <div className='menuItem' key={key}>
            <div><img src={menuItem.image} alt={menuItem.name} /></div>
            <h3>{menuItem.name}</h3>
            <p>{menuItem.price} TL</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
