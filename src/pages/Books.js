import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/books/")
      .then((r) => setBooks(r.data))
      .catch(() => {});
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Available Books</h2>

      <div style={styles.grid}>
        {books.length === 0 ? (
          <p style={styles.empty}>No books available.</p>
        ) : (
          books.map((b) => (
            <div key={b.id} style={styles.card}>
              <h3 style={styles.bookTitle}>{b.title}</h3>
              <p style={styles.author}>by {b.author}</p>
              <p style={styles.price}>₹{b.price}</p>

              <Link to={`/books/${b.id}`} style={styles.button}>
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ------------------ CSS Styles ------------------
const styles = {
  page: {
    minHeight: "60vh",
    background: "linear-gradient(135deg, #283e51, #4b79a1)",
    padding: "40px 20px",
    color: "white",
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "10px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.15)",
    padding: "20px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
    transition: "0.3s",
  },
  bookTitle: {
    fontSize: "20px",
    marginBottom: "8px",
  },
  author: {
    opacity: 0.8,
    marginBottom: "10px",
  },
  price: {
    background: "#00d4ff",
    color: "#000",
    padding: "6px 12px",
    borderRadius: "8px",
    display: "inline-block",
    fontWeight: "700",
    marginBottom: "15px",
    fontSize: "16px",
  },
  button: {
    display: "inline-block",
    padding: "10px 15px",
    background: "#00d4ff",
    color: "#000",
    borderRadius: "10px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "0.3s",
  },
  empty: {
    textAlign: "center",
    fontSize: "18px",
    opacity: 0.8,
    gridColumn: "1 / -1",
  },
};
