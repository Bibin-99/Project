
import React, {useState} from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();
  const submit = async ()=>{
    try{
      await axios.post('http://localhost:8000/api/auth/register/', { username, email, password });
      alert('Registered. Please login.');
      navigate('/login');
    }catch(e){ alert('Registration failed'); }
  };
  return (
    <Box sx={{maxWidth:400}}>
      <TextField fullWidth label="Username" value={username} onChange={e=>setUsername(e.target.value)} sx={{mb:2}} />
      <TextField fullWidth label="Email" value={email} onChange={e=>setEmail(e.target.value)} sx={{mb:2}} />
      <TextField fullWidth label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} sx={{mb:2}} />
      <Button variant="contained" onClick={submit}>Register</Button>
    </Box>
  );
}
