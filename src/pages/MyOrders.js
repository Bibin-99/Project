import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    axios
      .get("http://localhost:8000/api/my-orders/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => setOrders(r.data))
      .catch(() => {});
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>My Orders</h2>

        {orders.length === 0 ? (
          <p style={styles.empty}>No orders found.</p>
        ) : (
          <div style={styles.list}>
            {orders.map((o) => (
              <div key={o.id} style={styles.orderItem}>
                <div>
                  <h3 style={styles.bookTitle}>{o.book.title}</h3>
                  <p style={styles.detail}>
                    Quantity: <b>{o.quantity}</b>
                  </p>
                  <p style={styles.date}>Ordered: {o.ordered_at}</p>
                </div>
                <div style={styles.qtyBox}>
                  <span style={styles.qty}>{o.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// -------- Styled Components (Inline CSS) --------

const styles = {
  page: {
    minHeight: "60vh",
    background: "linear-gradient(135deg, #4b79a1, #283e51)",
    padding: "40px 0",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "90%",
    maxWidth: "800px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "25px 30px",
    color: "white",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "20px",
    textAlign: "center",
  },
  list: {
    marginTop: "10px",
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.15)",
    padding: "15px 20px",
    borderRadius: "15px",
    marginBottom: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    transition: "0.3s",
  },
  bookTitle: {
    fontSize: "20px",
    marginBottom: "5px",
  },
  detail: {
    fontSize: "14px",
    opacity: 0.9,
  },
  date: {
    fontSize: "13px",
    opacity: 0.7,
  },
  qtyBox: {
    background: "#00d4ff",
    padding: "8px 14px",
    borderRadius: "10px",
    color: "#000",
    fontWeight: "700",
    fontSize: "16px",
  },
  qty: {
    fontSize: "18px",
  },
  empty: {
    textAlign: "center",
    marginTop: "20px",
    opacity: 0.8,
  },
};
