import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Header(){
  const token = localStorage.getItem('access');
  const navigate = useNavigate();
  const logout = ()=>{ localStorage.removeItem('access'); localStorage.removeItem('refresh'); navigate('/'); };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{flex:1}}><Link to="/" style={{color:'inherit',textDecoration:'none'}}>Library</Link></Typography>
        <Button color="inherit" component={Link} to="/">Books</Button>
        {token ? (
          <>
            <Button color="inherit" component={Link} to="/my-orders">My Orders</Button>
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
  );
}
