import React, { useState, useRef } from 'react';
import EditDonation from './EditDonation'
import { Typography, Box, Backdrop, TextField, MenuItem } from '@mui/material';

function MenuChangeDonation({ donation, handleDonationsChange }) {
    const [backdropOpen, setBackdropOpen] = useState(false)
    const donationEditRef = useRef(null);

    const handleClose = (event) => {
        let parent = event?.target?.parentNode?.className.toString()
        if (parent && (parent.includes('Picker') ||
            parent.includes('MuiDay') ||
            parent.includes('MuiDate'))) {
            return;
        }
        if (
            (donationEditRef.current &&
                !donationEditRef.current.contains(event.target))
        ) {
            setBackdropOpen(false);
        }
    };
    const handleOpen = () => {
        setBackdropOpen(true);
    };

    return (

        <React.Fragment>
            <MenuItem
                onClick={handleOpen}
                key={'editDonation'} >
                Edit donation
            </MenuItem>
            <EditDonation donationEditRef={donationEditRef} handleClose={handleClose}
            backdropOpen={backdropOpen} setBackdropOpen={setBackdropOpen}  
            donation={donation} handleDonationsChange={handleDonationsChange} />
        </React.Fragment>
    );
}
export default MenuChangeDonation;