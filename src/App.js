import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import MyOrders from './pages/MyOrders';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

export default function App(){
  return (
    <BrowserRouter>
      <Header />
      <div style={{padding:20}}>
        <Routes>
          <Route path="/" element={<Books/>} />
          <Route path="/books/:id" element={<BookDetail/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/my-orders" element={<MyOrders/>} />

          {/* NEW ROUTES */}
          <Route path="/cart" element={<Cart/>} />
          <Route path="/payment" element={<Payment/>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
