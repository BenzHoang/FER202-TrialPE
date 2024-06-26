import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="Footer" sx={{mt:'auto', p:2, backgroundColor: '#fff' , color: '#000'}}>
            <Typography align='center'>© Tháng 6 2024 - Student Management App</Typography>
        </Box>
    );
};

export default Footer;