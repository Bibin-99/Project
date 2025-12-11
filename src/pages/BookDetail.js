import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/books/${id}/`)
      .then((r) => setBook(r.data))
      .catch(() => {});
  }, [id]);

  const addToCart = () => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.post(
      "http://localhost:8000/api/cart/add/",
      { book_id: id, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      alert("Added to cart!");
      navigate("/cart");
    })
    .catch(() => alert("Error while adding to cart"));
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      <p>Price: ₹{book.price}</p>

      <button onClick={addToCart} className="btn btn-primary">
        Add to Cart
      </button>
    </div>
  );
}
