import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#db0043', borderRadius: '8px' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BookScope
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={{ borderRadius: '20px' }}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/add" sx={{ borderRadius: '20px' }}>
          Add Review
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
