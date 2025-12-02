
import React, {useState} from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();
  const submit = async ()=>{
    try{
      const r = await axios.post('http://localhost:8000/api/token/', { username, password });
      localStorage.setItem('access', r.data.access);
      localStorage.setItem('refresh', r.data.refresh);
      navigate('/');
    }catch(e){ alert('Login failed'); }
  };
  return (
    <Box sx={{maxWidth:400}}>
      <TextField fullWidth label="Username" value={username} onChange={e=>setUsername(e.target.value)} sx={{mb:2}} />
      <TextField fullWidth label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} sx={{mb:2}} />
      <Button variant="contained" onClick={submit}>Login</Button>
    </Box>
  );
}
