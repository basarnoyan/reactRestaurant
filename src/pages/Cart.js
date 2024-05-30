import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css'; // CSS dosyasını import edin
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

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Veritabanından sepet verilerini çekmek için API isteği yap
    axios.get('http://localhost:3300/cart')
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart data', error);
      });
  }, []);

  const handleRemoveFromCart = (id) => {
    axios.delete(`http://localhost:3300/cart/${id}`)
      .then(() => {
        setCartItems(cartItems.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error removing item from cart', error);
      });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className='cart'>
      <h1 className='cartTitle'>Sepet</h1>
      <div className='cartList'>
        {/* Sepet öğelerini ekranda liste halinde göster */}
        {cartItems.map((cartItem, key) => (
          <div className='cartItem' key={key}>
            <div>
              {/* Resim elementinin src özniteliğini veritabanından gelen image path ile doldur */}
              <img src={imageMap[cartItem.image]} alt={cartItem.name} />
            </div>
            <h3>{cartItem.name}</h3>
            <p>{cartItem.price} TL</p>
            <button onClick={() => handleRemoveFromCart(cartItem.id)}>Kaldır</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
