import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position='static' sx={{ backgroundColor: '#0055a8'}}>
            <Toolbar>
                <Typography variant='h6' component="div" sx={{ flexGrow: 1}}>
                    Student Management App
                </Typography>
                <Button color='inherit' component={Link} to="/">Home</Button>
                <Button color='inherit' component={Link} to="/dashboard">Dashboard</Button>
                <Button color='inherit' component={Link} to="/contact">Contact</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;