
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Books(){
  const [books,setBooks]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:8000/api/books/').then(r=>setBooks(r.data));
  },[]);
  return (
    <Grid container spacing={2}>
      {books.map(b=> (
        <Grid item xs={12} md={4} key={b.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{b.title}</Typography>
              <Typography variant="body2">{b.author}</Typography>
              <Typography variant="body2">Price: ₹{b.price}</Typography>
              <Typography variant="body2">Available: {b.available_copies}</Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to={'/book/'+b.id}>View</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
