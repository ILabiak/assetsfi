import React, { useState, useEffect, useRef } from 'react';
import styles from './donationsinfo.module.css';
import { Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import CreateTransaction from '@/components/CreateTransaction/CreateTransaction'
import AddDonation from './AddDonation';


function AddDonationButton({ handleDonationsChange }) {
    const [backdropOpen, setBackdropOpen] = useState(false)
    const donationCreateRef = useRef(null);

    const handleClose = (event) => {
        let parent = event?.target?.parentNode?.className.toString()
        if (parent && (parent.includes('Picker') ||
            parent.includes('MuiDay') ||
            parent.includes('MuiDate'))) {
            return;
        }
        if (
            (donationCreateRef.current &&
                !donationCreateRef.current.contains(event.target))
        ) {
            setBackdropOpen(false);
        }
    };
    const handleOpen = () => {
        setBackdropOpen(true);
    };

    return (
        <React.Fragment>
            <Box
                onClick={handleOpen}
                sx={{
                    padding: '5px',
                    marginTop: '0px',
                }} className={styles.createButton}>
                Add donation
            </Box>
            <AddDonation
                donationCreateRef={donationCreateRef}
                handleOpen={handleOpen} handleClose={handleClose}
                backdropOpen={backdropOpen} setBackdropOpen={setBackdropOpen}
                handleDonationsChange={handleDonationsChange}
            />
            {/* <CreateTransaction currency={123} portfolio={123}
                handleDonationsChange={handleDonationsChange}
                transactionCreateRef={transactionCreateRef}
                handleOpen={handleOpen} handleClose={handleClose}
                backdropOpen={backdropOpen} setBackdropOpen={setBackdropOpen} /> */}
        </React.Fragment>
    );
}
export default AddDonationButton;