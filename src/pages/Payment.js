import React, { useEffect, useState } from "react";

export default function Payment() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cart/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);

          let t = 0;
          data.forEach((i) => {
            t += Number(i.book.price) * Number(i.quantity);
          });
          setTotal(t);
        }
      })
      .catch(() => setItems([]));
  }, []);

  const submitPayment = (e) => {
    e.preventDefault();

    setMessage(
      `🎉 Payment Successful!\n\nOrder placed for ${name}.\nDelivery to: ${address}, ${location}.\nPhone: ${phone}.`
    );

    setItems([]);
    setTotal(0);
    setShowForm(false);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "900px" }}>
      <h2 className="fw-bold mb-4">💳 Payment Summary</h2>

      {/* SUCCESS MESSAGE */}
      {message && (
        <div
          style={{
            background: "#d4edda",
            padding: "18px",
            borderRadius: "8px",
            border: "1px solid #b2d8c4",
            color: "#155724",
            whiteSpace: "pre-line",
            marginBottom: "20px",
          }}
        >
          {message}
        </div>
      )}

      {/* PAYMENT FORM */}
      {showForm && (
        <form
          onSubmit={submitPayment}
          className="card p-4 mb-4"
          style={{ borderRadius: "10px" }}
        >
          <h4 className="fw-semibold mb-3">📝 Delivery Details</h4>

          <table className="table table-borderless">
            <tbody>
              <tr>
                <th style={{ width: "30%" }}>Full Name</th>
                <td>
                  <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>Address</th>
                <td>
                  <textarea
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>Location</th>
                <td>
                  <input
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>Phone</th>
                <td>
                  <input
                    className="form-control"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button className="btn btn-success w-100 mt-3 fs-5 fw-bold">
            ✔ Confirm Payment
          </button>
        </form>
      )}

      {/* CART TABLE */}
      {!showForm && items.length > 0 && (
        <>
          <table className="table table-hover table-bordered">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Price (₹)</th>
                <th>Qty</th>
                <th>Subtotal (₹)</th>
              </tr>
            </thead>

            <tbody>
              {items.map((i, idx) => (
                <tr key={i.id}>
                  <td>{idx + 1}</td>
                  <td className="fw-semibold">{i.book.title}</td>
                  <td>{i.book.price}</td>
                  <td>{i.quantity}</td>
                  <td>{Number(i.book.price) * Number(i.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* TOTAL TABLE */}
          <table className="table table-bordered" style={{ maxWidth: "350px" }}>
            <tbody>
              <tr className="table-secondary">
                <th className="fw-bold fs-5">Total Amount</th>
                <td className="fw-bold fs-5">₹{total}</td>
              </tr>
            </tbody>
          </table>

          <button
            className="btn btn-primary mt-3 fs-5 fw-semibold"
            onClick={() => setShowForm(true)}
            style={{ padding: "10px 25px" }}
          >
            Proceed to Pay →
          </button>
        </>
      )}

      {items.length === 0 && !message && (
        <p className="text-muted mt-4">No items in cart for payment.</p>
      )}
    </div>
  );
}
