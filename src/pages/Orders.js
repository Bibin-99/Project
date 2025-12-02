
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

export default function Orders(){
  const [orders,setOrders]=useState([]);
  useEffect(()=>{
    const token = localStorage.getItem('access');
    if(!token){ return; }
    axios.get('http://localhost:8000/api/orders/', { headers:{ Authorization:'Bearer '+token } }).then(r=>setOrders(r.data));
  },[]);
  return (
    <div>
      <Typography variant="h5">My Orders</Typography>
      <List>
        {orders.map(o=> (
          <ListItem key={o.id}>
            <ListItemText primary={`Order #${o.id} - ₹${o.total}`} secondary={new Date(o.created_at).toLocaleString()} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
