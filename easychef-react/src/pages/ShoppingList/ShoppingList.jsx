import React, { useState, useEffect } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const token =  localStorage.getItem('token')
  useEffect(() => {
    async function fetchCartItems() {
    
    const response = await fetch('http://127.0.0.1:8000/recipes/getcart/', {
        method: 'GET',
        headers: {
        Authorization: 'Bearer ' + token,
        },
    });

    if (response.ok) {
        const data = await response.json();
        setCartItems(data);
    } 
    }
    fetchCartItems();
  }, []);

  const handleEmptyShoppingList = async () => {
    const response = await fetch(`http://127.0.0.1:8000/recipes/empty/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.ok) {
        window.location.reload();
    } 
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name}: {item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={handleEmptyShoppingList}> empty the list </button>
    </div>
  );
}

export default Cart;