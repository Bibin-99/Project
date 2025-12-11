import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/auth/register/", { username, password })
      .then(() => {
        alert("Registered! Please login.");
        navigate("/login");
      })
      .catch(() => alert("Error"));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={submit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={styles.link}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

// ---------- CSS (Inline Styles) ----------
const styles = {
  page: {
    height: "60vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4b79a1, #283e51)",
  },
  card: {
    width: "360px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    color: "#fff",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "15px",
    border: "2px solid transparent",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#00d4ff",
    color: "#000",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
  loginText: {
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#00d4ff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
