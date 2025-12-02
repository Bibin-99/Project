
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, TextField } from '@mui/material';

export default function BookDetail(){
  const {id} = useParams();
  const [book,setBook]=useState(null);
  const [qty,setQty]=useState(1);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:8000/api/books/'+id+'/').then(r=>setBook(r.data));
  },[id]);
  const placeOrder = async (type='buy')=>{
    const token = localStorage.getItem('access');
    if(!token){ alert('Login required'); navigate('/login'); return; }
    const data = { order_type: type, items: [{ book_id: book.id, quantity: qty, price: book.price }] };
    try{
      await axios.post('http://localhost:8000/api/orders/', data, { headers: { Authorization: 'Bearer '+token } });
      alert('Order placed');
      navigate('/orders');
    }catch(e){ alert('Error placing order'); }
  };
  if(!book) return <div>Loading...</div>;
  return (
    <div>
      <Typography variant="h4">{book.title}</Typography>
      <Typography variant="subtitle1">{book.author}</Typography>
      <Typography sx={{mt:2}}>{book.description}</Typography>
      <Typography sx={{mt:2}}>Price: ₹{book.price}</Typography>
      <TextField label="Quantity" type="number" value={qty} onChange={e=>setQty(Number(e.target.value))} sx={{mt:2}} />
      <div style={{marginTop:12}}>
        <Button variant="contained" onClick={()=>placeOrder('buy')}>Buy</Button>
        <Button variant="outlined" onClick={()=>placeOrder('rent')} sx={{ml:2}}>Rent</Button>
      </div>
    </div>
  );
}
