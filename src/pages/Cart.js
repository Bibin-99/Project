import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    fetch("http://127.0.0.1:8000/api/cart/", {
  headers: { 
    "Authorization": "Bearer " + localStorage.getItem("access")
  }
})

    .then(res => res.json())
    .then(data => {
      // DEBUG
      console.log("Cart API response:", data);

      if (Array.isArray(data)) {
        setItems(data);
      } else if (Array.isArray(data.items)) {
        setItems(data.items);
      } else {
        setItems([]);
      }
    })
    .catch(err => {
      console.log("Cart fetch error:", err);
      setItems([]);
    });

  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        items.map(i => (
          <div key={i.id} className="card p-3 mt-2">
            <h4>{i.book.title}</h4>
            <p>Quantity: {i.quantity}</p>
            <p>Price: ₹{i.book.price}</p>
          </div>
        ))
      )}

      <button
        onClick={() => navigate("/payment")}
        className="btn btn-success mt-3"
      >
        Proceed to Payment
      </button>
    </div>
  );
}
