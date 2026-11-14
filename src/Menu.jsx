import React, { useState, useEffect } from 'react';
import './Menu.css';
import jsPDF from 'jspdf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiSquarePlus } from "react-icons/ci";
import Model from './model';

const menuItems = [
  { name: "coca", price: 10, image: "image/soda.jpg", category: "drinks" },

  { name: "fanta", price: 10, image: "image/fanta.png", category: "drinks" },
  { name: "fanta citron", price: 10, image: "image/fanta-citron.png", category: "drinks" },
  { name: "poms", price: 10, image: "image/poms.png", category: "drinks" },
  { name: "orange jus", price: 15, image: "image/orange.png", category: "drinks" },
  { name: "banane jus", price: 17, image: "image/banane.png", category: "drinks" },
  { name: "avocat jus", price: 17, image: "image/avocat.png", category: "drinks" },

  { name: "bisara", price: 15, image: "image/bisara.jpg", category: "food" },
  { name: "petit dejeuner", price: 20, image: "image/petit-dejeuner.jpg", category: "food" },
  { name: "les gouffres", price: 15, image: "image/les-gouffres.png", category: "food" },
  { name: "coffee", price: 12, image: "image/coffie.jpg", category: "coffee" },
  { name: "normal", price: 7, image: "image/coffie.jpg", category: "coffee" }
];

const Menu = () => {
  const [menuItem, setMenuitem] = useState(menuItems);
  const [filteredMenu, setFilteredMenu] = useState(menuItem);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [isopen, setIsopen] = useState(false);

  const displayMenu = (category = 'All') => {
    if (category === 'All') {
      setFilteredMenu(menuItem);
    } else {
      setFilteredMenu(menuItem.filter(item => item.category === category));
    }
  };

  const addToOrder = (item) => {
    setOrder([...order, item]);
    setTotal(total + item.price);
  };

  const removeFromOrder = (index) => {
    const itemToRemove = order[index];
    setOrder(order.filter((_, i) => i !== index));
    setTotal(total - itemToRemove.price);
  };

  const clearOrder = () => {
    setOrder([]);
    setTotal(0);
  };

  const generatePDF = () => {
    if (total === 0) {
      alert('no orders');
    } else {
      const doc = new jsPDF();
      doc.setFontSize(16);

      doc.text("====== Order Summary ======", 20, 20);

      let y = 30;
      order.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.name} - ${item.price} DH`, 20, y);
        y += 10;
      });

      doc.text(`Total: ${total} DH`, 20, y + 10);
      doc.text("=========================", 20, y + 20);
      doc.save('order-summary.pdf');
      setOrder([]);
      setTotal(0);
      toast.success(' Order valider ', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onAdd = (newItem) => {
    setMenuitem([...menuItem, newItem]);
    toast.success(' item add successfully ', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    displayMenu('All');
  }, [menuItem]);

  return (
    <div className="menu-container">
      <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
          <img src="image/coffeelogo.png" alt=""  style={{width:'250px',height:'250px'}} />
        </div>
        
        <div style={{display:'flex'}}>
        <h2 style={{ padding:'20px'}}>Add new item </h2>
        <button
          onClick={() => setIsopen(true)}
          className='addItemNewbutton'>
          <CiSquarePlus id='plus' />
        </button>
        <Model open={isopen} onAdd={onAdd} close={() => setIsopen(false)}></Model>
      </div>
      </div>

      <div className="filterBavbar">
        <ul>
          <li><a onClick={() => displayMenu('All')}>All</a></li>
          <li><a onClick={() => displayMenu('drinks')}>Drinks<img className="icon" src={"./image/drinks.png"} alt="drinks" /></a></li>
          <li><a onClick={() => displayMenu('food')}>Food<img className="icon" src="./image/food.png" alt="food" /></a></li>
          <li><a onClick={() => displayMenu('coffee')}>Coffee<img className="icon" src="./image/coffee.png" alt="coffee" /></a></li>
        </ul>
      </div>

      <div className="container">
        <div className="left-panel">
          <div id="menu-list" className="menu-list">
            {filteredMenu.map((item, index) => (
              <div key={index} className="menu-item" onClick={() => addToOrder(item)}>
                <img src={item.image} alt={item.name} />
                <div className="pp">
                  <p id="pname">{item.name}</p>
                  <p id="pprix">{item.price} DH</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="right-panel">
          <h1 style={{ margin: '0 auto', textAlign: 'center', width: 'fit-content' }}>Orders</h1>
          <ul id="order-list">
            {order.map((item, index) => (
              <li key={index} className="order-item">
                <span>{item.name} - {item.price} DH</span>
                <button onClick={() => removeFromOrder(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className='total'>Total: <span className='total'>{total}</span> DH</div>
          <div className='right-panel-buttons' >
            <button id="validerbutton" onClick={generatePDF}>Validate Order</button>
            <button id="suppButton" onClick={clearOrder}>Clear All</button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
