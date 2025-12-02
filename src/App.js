
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material';
import Books from './pages/Books';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import BookDetail from './pages/BookDetail';
import NewOrder from './pages/NewOrder';

function App(){ 
  const token = localStorage.getItem('access');
  const logout = ()=>{ localStorage.removeItem('access'); localStorage.removeItem('refresh'); window.location='/'; }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{flexGrow:1}}>Library</Typography>
          <Button color="inherit" component={Link} to="/">Books</Button>
          {token ? (
            <>
              <Button color="inherit" component={Link} to="/orders">My Orders</Button>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ):(
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{mt:3}}>
        <Routes>
          <Route path="/" element={<Books/>} />
          <Route path="/book/:id" element={<BookDetail/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/new-order" element={<NewOrder/>} />
        </Routes>
      </Container>
    </div>
  );
}
export default App;
